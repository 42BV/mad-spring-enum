# About

[![Build Status](https://travis-ci.org/42BV/mad-spring-enum.svg?branch=master)](https://travis-ci.org/42BV/mad-spring-enum)
[![Codecov](https://codecov.io/gh/42BV/mad-spring-enum/branch/master/graph/badge.svg)](https://codecov.io/gh/42BV/mad-spring-enum)

Sharing enums with a Java Spring Boot back-end.

# Installation

`npm install mad-spring-enum --save`

# Preparation

First in your Java project make sure mad-spring-enum can read
the enums, via a GET request:

```java
// EnumController.java

@RestController
@RequestMapping("/enums")
class EnumController {

    private final Map<String, Set<String>> registry = new HashMap<>();

    @Autowired
    EnumController(EnumClassPathScanningCandidateComponentProvider enumProvider) {
        enumProvider.findCandidateComponents(Application.class.getPackage().getName())
            .forEach(component -> {
                Class<Enum<?>> componentClass = forName(component.getBeanClassName());
                registry.put(componentClass.getSimpleName(), stream(componentClass.getEnumConstants())
                    .map(Enum::name)
                    .collect(toSet()));
            });
    }

    @GetMapping
    Map<String, Set<String>> findAll() {
        return registry;
    }

}

// EnumClassPathScanningCandidateComponentProvider.java

/**
 * EnumClassPathScanningCandidateComponentProvider is a specialization of {@link ClassPathScanningCandidateComponentProvider}
 * that only takes enum values into account.
 *
 * Furthermore it overrides the default behaviour of the {@link ClassPathScanningCandidateComponentProvider}
 * that checks that the classes that are found on the classpath are non-abstract. By their definition, an
 * enum that contains abstract methods or implements an interface is abstract and ignored.
 * This does not serve our purpose, hence the specialisation.
 */
@Component
class EnumClassPathScanningCandidateComponentProvider extends ClassPathScanningCandidateComponentProvider {

    EnumClassPathScanningCandidateComponentProvider() {
        super(false);
        addIncludeFilter(new IsEnumFilter());
    }

    /**
     * Determine whether the given bean definition qualifies as candidate.
     *
     * The default implementation checks whether the class is concrete
     * but this is does not work for us because an enum is considered abstract
     * when it implements an interface or has an abstract method.
     *
     * The JavaDoc of the default implementation also states that
     * this behaviour can be overridden in subclasses.
     *
     * @param beanDefinition the bean definition to check
     * @return whether the bean definition qualifies as a candidate component
     */
    @Override
    protected boolean isCandidateComponent(AnnotatedBeanDefinition beanDefinition) {
        return beanDefinition.getMetadata().isIndependent();
    }

    private static class IsEnumFilter implements TypeFilter {

        @Override
        public boolean match(MetadataReader metadataReader, MetadataReaderFactory metadataReaderFactory) throws IOException {
            String className = metadataReader.getClassMetadata().getClassName();
            Class<Enum> clazz = Classes.forName(className);
            return clazz.isEnum();
        }
    }
}
```

# Getting started.

We assume you have a working Redux project, if you do not yet have
Redux add Redux to your project by following the Redux's instructions.

We also assume that you have redux-form installed via the instructions
provided on the website.

First install the following dependencies in the package.json:

  1. "react-redux": "5.0.3",
  2. "redux": "3.6.0",

Now add the constraints-reducer to your rootReducer for example:

```js
// @flow

import { combineReducers } from 'redux';

import type { EnumsStore } from 'mad-spring-enum';
import { enums } from 'mad-spring-enum';

export type Store = {
  enums: EnumsStore
};

// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer: Store = combineReducers({
  enums
});

export default rootReducer;
```

This should add the EnumsStore to Redux, which will store
the enums from the Spring back-end.

Next you have to configure the enums module:

```js
import { createStore } from 'redux';
import { configureEnums } from 'mad-spring-enum';

export const store = createStore(
  rootReducer,
);

configureEnums({
   // The URL which will provide the enums over a GET request.
  enumsUrl: '/api/enums',

  // Whether or not the 'enumsUrl' should be called with authentication.
  needsAuthentication: true,

  // The dispatch function for the Redux store.
  dispatch: store.dispatch,

  // A function which returns the latests EnumsStore from Redux.
  enumsStore: () => store.getState().enums
});
```

The enums module must be configured before the application
is rendered.

Finally you will have load the enums from the back-end using
the `loadEnums` function. If in order for the constraints
to be loaded you need to be logged in, you should load the enums
as soon as you know that you are logged in:

```js
import { loadEnums } from 'mad-spring-enum';

import { login } from 'somewhere';

class Login extends Component {
  doLogin(username, password) {
    login({ username, password })
      .then(loadEnums); // Load enums ASAP
  }

  render() {
    // Render here which calls doLogin
  }
}
```

If you do not need a login before you can fetch the enums
simply fetch them using `loadEnums` as soon as possible.

# Usage

Now assuming you have an '' from the back-end and you want to use
it in the front-end, you can retrieve the values of the enum by calling:

```js
import { getEnum } from 'mad-spring-enum';
import type { EnumValues } from 'mad-spring-enum';

const userRoles: EnumValues = getEnum('UserRole'));

// now use userRoles as you please, it should be an array of strings.
```
