import React from 'react';
import { EnumsProvider, useEnums, EnumsContext } from '../src/provider';
import renderer from 'react-test-renderer';

const HookTest = () => {
  const { CAR_TYPES } = useEnums();
  return <h2>I really like {CAR_TYPES[2]} cars</h2>;
};

class ConsumerTest extends React.Component<{ favoriteCar: string }> {
  render() {
    const { favoriteCar } = this.props;
    return <h2>My favorite car brand is {favoriteCar}</h2>;
  }
}

describe('EnumProvider', () => {
  test('should provide context as hook', () => {
    const tree = renderer
      .create(
        <EnumsProvider enums={{ CAR_TYPES: ['AUDI', 'MUSTANG', 'TESLA'] }}>
          <HookTest />
        </EnumsProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should provide context as consumer', () => {
    const tree = renderer
      .create(
        <EnumsProvider enums={{ CAR_TYPES: ['AUDI', 'MUSTANG', 'TESLA'] }}>
          <EnumsContext.Consumer>
            {({ CAR_TYPES }) => <ConsumerTest favoriteCar={CAR_TYPES[1]} />}
          </EnumsContext.Consumer>
        </EnumsProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
