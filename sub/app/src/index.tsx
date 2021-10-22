import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import Rate from 'common/Rate';
import './index.less';

function App() {
  return (
    <div styleName="container">
      <h1>子应用的common组件：</h1>
      <Rate />
    </div>
  );
}

function render(props) {
  const { container } = props;
  ReactDOM.render(<App />, container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {}

export async function mount(props) {
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  const node = container ? container.querySelector('#sub-react') : document.querySelector('#sub-react');
  if (node) {
    ReactDOM.unmountComponentAtNode(
      container ? container.querySelector('#sub-react') : document.querySelector('#sub-react')
    );
  }
}
