import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from 'lodash';

import Page from '../_common/page';
import * as actions from "../../actions";
import Spinner from "../_common/spinner";
import { toast } from 'react-toastify';


 class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state= {
            showSpinner: false,
            tasks: []
        }
    } 

    componentDidMount() {
         this.setState({
             showSpinner: true
         });
         this.props.getTasks(res=> {
             if (res.success === true) {
                 this.setState({
                     showSpinner: false, 
                     tasks: res.tasks
                 })
             } else {
                 toast.error("Sorry, not able to get tasks.")
             }
         });

    }

    renderTaskCompleted(task) {
        let className = "tasks__item-completed";
        let  source='/images/SVG/check_box_blank.svg';

        if (task.completed === true) {
            className = "tasks__item-completed--done";
            source='/images/SVG/check_box.svg';
        }
        return (
            <div className={className} onClick={()=> {
                task.completed = !task.completed
                this.props.updateTask(task, res=> {
                     if (res.success === true) {
                        let found = _.find(this.state.tasks, {id: task.id});
                        found.completed= task.completed;
                        this.forceUpdate();
                     } else {
                         toast.error("SOrry, not able to update the task!")
                     }
                });
            }}>
                 <img src={source} alt='check' />
                 Completed         
            </div>
        )    
    }

    renderTask(task) {
        return <div className='tasks__item' key={task.id}>

               <div className='tasks__item-description'>
                     {task.description}
               </div>
               {this.renderTaskCompleted(task)}
               
        </div>

    }

    render() {
        if (this.state.showSpinner === true) {
            return <Spinner boxedIn />
        }
        return <div className="tasks"> 
                  {_.map(this.state.tasks, this.renderTask.bind(this))}
             </div>
    }
}



export default connect(null, actions)(Page(Tasks));