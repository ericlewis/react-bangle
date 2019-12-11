## Warning
This is super incomplete. Styling isn't supported in this version yet.


Usage Example:
```javascript
import React from 'react';
import Renderer from 'react-bangle';
import Base from 'react-bangle/elements/Base';

class Root extends Base {
  render() {
    // .s("Hello World!", 10, 0)
    console.log(super.render())
  }
}

function App() {
  return (
    <view style={{paddingLeft: 10}}>
      <text>Hello World!</text>
    </view>
  );
}

Renderer.render(<App />, new Root());
```
