import React from 'react';
import ReactDOM from 'react-dom';
import Rate from 'common/Rate';
import { registerMicroApps, start } from 'qiankun';
import { Button } from 'antd';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import './index.less';

registerMicroApps([
  {
    name: 'sub-react',
    entry: '//localhost:9003',
    container: '#sub-react',
    activeRule: '/sub-react',
  },
]);

start();

function App() {
  const history = useHistory();
  return (
    <div styleName="container">
      <Button
        onClick={() => {
          history.push('/sub-react');
        }}
      >
        sub-react
      </Button>
      <Button
        onClick={() => {
          history.push('/');
        }}
      >
        back
      </Button>
      <Route exact path="/sub-react" component={() => <div id="sub-react"></div>} />
      <Route
        exact
        path="/"
        component={() => (
          <>
            <h1>主应用的common组件：</h1>
            <Rate />
          </>
        )}
      />
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('main-root')
);

// 模块热更新
if (module.hot) {
  module.hot.accept();
}
