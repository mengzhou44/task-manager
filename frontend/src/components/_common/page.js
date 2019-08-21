import React, { Component } from "react";
import { ToastContainer, cssTransition } from 'react-toastify';

import Header from "./header";
import styles from "./page.module.scss";

export default function(ComposedComponent) {
  class PageWrapper extends Component {
    componentDidMount() {
      window.scrollTo(0, 0);
    }

    renderFooter() {
      const year = new Date().getFullYear();
      const footer = `© ${year}  Easy Express Solutions Inc.`;
      return <div className={styles.footer}>{footer}</div>;
    }

    render() {
      const zoom = cssTransition({
        enter: 'zoomIn',
        exit: 'zoomOut',
        duration: 750
       });

      return (
        <div className={styles.page}>
      
          <div className={styles.content}>
            <Header />
            {<ComposedComponent {...this.props} />}
             <ToastContainer
                  transition={zoom}
                  position='bottom-left'
                  hideProgressBar
              />
           
          </div>

          {this.renderFooter()}
        </div>
      );
    }
  }

  return PageWrapper;
}



 