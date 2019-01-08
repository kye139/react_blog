import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  HomePage, ManagePage, NotFoundPage, PostContentPage, PostListPage, PostWritePage, NoticeListPage, NoticePostPage, NoticeWritePage
} from 'pages'

class App extends Component {
  // componentDidMount() {
  //   const jquery = document.createElement('script');
  //   jquery.src = '../assets/js/jquery.min.js';
  //   jquery.type = 'text/javascript';
  //   jquery.async = true;
  //   document.body.appendChild(jquery);

  //   const skel = document.createElement('script');
  //   skel.src = 'assets/js/skel.min.js';
  //   skel.type = 'text/javascript';
  //   skel.async = true;
  //   document.body.appendChild(skel);

  //   const util = document.createElement('script');
  //   util.src = 'assets/js/util.js';
  //   util.type = 'text/javascript';
  //   util.async = true;
  //   document.body.appendChild(util);

  //   const main = document.createElement('script');
  //   main.src = 'assets/js/main.js';
  //   main.type = 'text/javascript';
  //   main.async = true;
  //   document.body.appendChild(main);
  // }

  render() {
    return (
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/manage' component={ManagePage}/>
          <Route exact path='/notice' component={NoticeListPage}/>
          <Route exact path='/notice/:id' component={NoticePostPage}/>
          <Route exact path='/notice/write/:id' component={NoticeWritePage}/>
          <Route exact path='/post' component={PostListPage}/>
          <Route exact path='/post/:id' component={PostContentPage}/>
          <Route exact path='/post/write/:id' component={PostWritePage}/>
          <Route component={NotFoundPage}/>
        </Switch>
    );
  }
}

export default App;