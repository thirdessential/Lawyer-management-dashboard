  import { Tabs } from 'antd';
  import React, { useEffect } from 'react';
  import UpcomingTasks from '../../Tasks/UpcomingTasks/upcomingTasks';
  import CompletedTask from '../../Tasks/CompletedTasks/CompletedTasks';
  import api from '../../../../resources/api';
  import { Button, Modal, notification, Popconfirm, message, Space, Spin } from 'antd';
  import { Form } from 'react-bootstrap';
  import { connect } from 'react-redux';
  import jsPDF from 'jspdf';
  import { Input, Select } from 'antd';
  import ExportExcel from '../../Tasks/ExcelExport'
  import ReactDOM from 'react-dom'
  import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
  
  
  import 'jspdf-autotable';
  let res = {};
  let response = {};
  let ListData = null;
  let options = null;
  
  
  
  class Tasks extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        visible: false,
        confirmLoading: false,
        loading: false,
        Data: { priority: 'Normal', matter: "" },
        editMode: false,
        res: '',
        selected: null,
        status: false,
        disable : false,
        spinning : true,
        options : [],
        index: 0
      };
    }
    exportPDF = () => {
      const unit = 'pt';
      const size = 'A4'; // Use A1, A2, A3 or A4
      const orientation = 'portrait'; // portrait or landscape
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
      doc.setFontSize(15);
      const title = 'Tasks';
      const headers = [
        ['S.No', 'Task Name', 'Description', 'Matter', 'Due Date'],
      ];
      let data = [];
      let count = 0
      this.state.tableData.map((val, index) => {
          const td = [
            index,
            val.taskName,
            val.description,
            val.matter,
            val.dueDate.substring(0,10),
          ];
          data.push(td);
       
      });
      let content = {
        startY: 50,
        head: headers,
        body: data,
      };
      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save('Tasks.pdf');
    };
  
    cancel(e) {
      console.log(e);
      message.error('Canceled');
    }
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
    openNotificationWithFailure = (type) => {
      notification[type]({
        message: 'Failure',
      });
    };
    openNotificationWithSucces = (type) => {
      notification[type]({
        message: 'Task Saved',
      });
    };
  
  
    handleCancel = () => {
      ReactDOM.findDOMNode(this.messageForm).reset()
  
      this.setState({
        visible: false,
        editMode : false,
        Data: { priority: 'Normal', matter: "" },
      });
    };
  
    handleChange = (e) => {
      e.persist();
      let newState = this.state;
      if (e.target.id === "matter" ) {
      
        if( e.target.selectedIndex > 0){
          newState.index = e.target.selectedIndex 
          newState.Data[e.target.id] = e.target.value;
        }
        
      } else {
        newState.Data[e.target.id] = e.target.value;
      }
      this.setState(newState);
      console.log(this.state);
    };
  
    
  
   
    getISTDate(dateInUTC) {
      var localDate = new Date(dateInUTC);
      return localDate.toLocaleString();
    }
    handleView = (record) => {
  
      delete record.edit
      delete record.delete
    
      this.props.history.push('/tasks/view/list', record)
    };
    async componentDidMount() {
      
      let tableData = [];
      let CompletedData = []
      let upcomingData = []
      let options = []
      api
        .get('/matter/viewforuser/' + this.props.userId)
        .then((res) =>{
          response = res.data.data
          console.log(response);
          response.map((value, index) => {
          options.push( <option>{value.matterDescription}</option>)
     
        } );
         
      });
      
      await api.get('/tasks/fetchformatter/' + this.props.id).then((res) => {
        console.log(res)
        console.log(this.props.userId)
        res.data.data.map((value, index)=>{
          const newdata = value
          newdata.matter = newdata.matter ? newdata.matter.matterDescription : "nil"
          newdata.matterId = newdata.matter? newdata.matter._id : ""
          newdata.key = index 
          newdata.dueDate = newdata.dueDate ? newdata.dueDate.substring(0,10)  : "-"
          if(value.status == false){
            
            upcomingData.push(newdata)
            tableData.push(newdata)
          }
          if(value.status == true){
  
            CompletedData.push(newdata)
          }
         
          
        })
        this.setState({ 
           CompletedData, 
           tableData,
           options ,
           upcomingData,
          spinning: false
         });
        // res.data.data.map((item, index) => {
        //   tableData = [
        //     ...tableData,
        //     {
        //       ...item,
        //       key: item._id,
        //     },
        //   ];
        // });
  /*
        ListData = res.data.data.map((value, index) => {
          return (
            <tr>
              <th scope="row">{value.dueDate}</th>
              <td>{value.description}</td>
              <td>{value.taskName}</td>
              <td>{value.matter.matterDescription}</td>
              <td>
                <Button onClick={() => this.EditHandler(value, index)}>
                  Edit
                </Button>
              </td>
              <td>
                <Popconfirm
                  title="Are you sure delete this task?"
                  onConfirm={() => this.deleteHandler(value, index)}
                  onCancel={this.cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
              </td>
            </tr>
          );
        });*/
      });
      
  
    }
  
    columns = [
      {
        title: 'Task Name',
        dataIndex: 'taskName',
        key: '1',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: '2',
      },
      /*
      {
        title: 'Matter',
        dataIndex: 'matterDescription',
        key: '3',
        render: (_, record) => {
          // console.log(record);
          return record.matter;
        },
      },
      */
      {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: '3',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.dueDate.length - b.dueDate.length,
        
      },
      {
        title: 'Action',
        dataIndex: 'status',
        key: '7',
        render: (_, record) => {
          return (
            <Popconfirm
              title="Mark as Complete"
              onConfirm={() => this.handelAction(record._id)}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Form.Check type="checkbox"  />
            </Popconfirm>
          );
        },
      },
      {
        title: 'Edit',
        dataIndex: 'edit',
        key: '6',
        render: (_, record) => {
          return (
            <Button onClick={() => this.EditHandler(record)}>Edit</Button>
          );
        },
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        key: '7',
        render: (_, record) => {
          return (
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => this.deleteHandler(record._id)}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          );
        },
      },
    ];
    deleteHandler(_id) {
      api.get('tasks/delete/' + _id).then((res)=>{
        console.log(res)
        notification.success({message : "Task Deleted"})
        this.componentDidMount()
      })
     
    }
    EditHandler(_id) {
      this.setState({ editMode: true });
      this.setState({ Data: _id });
      console.log(this.state.Data)
      this.setState({ selected: _id });
    }
    handleOk = (e) => {
      e.persist();
      notification.destroy();
      let valid = true
      console.log(this.state.Data.matter)
      if(this.state.Data.taskName === '' || this.state.Data.taskName === undefined ){
        valid = false
        notification.warning({
          message: 'Please provide a Task Name',
        });
      }else
      if(this.state.Data.description === '' ||this.state.Data.description === undefined  ){
        valid = false
        notification.warning({
          message: 'Please provide a description',
        });
      }else
      if( this.state.Data.dueDate === '' || this.state.Data.dueDate === undefined  ){
        valid = false
        notification.warning({
            message: 'Please select a due date',
          });
      }else
      if( this.state.Data.matter === "" || this.state.Data.matter === undefined ){
        valid = false
        notification.warning({
          message: 'Please select a matter',
        });
        
      }else
      if(valid){
        this.setState({
          confirmLoading: true,
          disable : true
        });
        const data = this.state.Data;
        data.userId = this.props.userId;
        if(this.state.index != 0){
          data.matter = response[this.state.index - 1]
        }else{
          data.matter = data.matterId
        }
        if (this.state.editMode) {
          api
            .post('tasks/edit/' + data._id, data)
            .then((res) => {
              console.log(res)
              this.componentDidMount()
              notification.success({message : "Task Edited"})
            }
            )
            .catch(() => {
              this.openNotificationWithFailure('error');
            }).then(()=>{
              this.setState({
                visible: false,
                editMode : false,
                disable : false,
                index : 0,
                Data: { priority: 'Normal', matter: "" },
                confirmLoading: false,
              });
              ReactDOM.findDOMNode(this.messageForm).reset()
            })
        } else {
          api
            .post('/tasks/create', data)
            .then((res) => {
              console.log(res)
              this.openNotificationWithSucces('success')
              
              this.componentDidMount()
            })
            .catch(() => {
              this.openNotificationWithFailure('error');
            }).then(()=>{
              this.setState({
                visible: false,
                editMode : false,
                disable : false,
                index : 0,
                Data: { priority: 'Normal', matter: "" },
                confirmLoading: false,
              });
              ReactDOM.findDOMNode(this.messageForm).reset()
            })
        }
        
        
      }
        
    };
  
    handelAction = (_id) =>{
      this.setState({
        status : true
      })
      const data = this.state.status;
      console.log(data)
      api.get('/tasks/updatetask/'+_id, data)
      .then((res) => {
        this.componentDidMount()
        notification.success({message : "Marked as completed"})
        console.log(res)
      })
      .catch((err) => {
          console.log(err); 
        });
     setTimeout(()=>{
      //window.location.reload()
     },600)
    }
    handelNonAction = (record) =>{
      const data = record
      data.status = false
      console.log(data)
      api.get('/tasks/setfalse/' + record._id, data)
      .then((res) => {
        console.log(res)
        this.componentDidMount()
        notification.success({message : "Unmarked as completed"})
      })
      .catch((err) => {
          console.log(err); 
        });
    }
  
  
    newcolumns = [
      {
        title: 'Task Name',
        dataIndex: 'taskName',
        key: '1',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: '2',
      },
      // {
      //   title: 'Matter',
      //   dataIndex: 'matterDescription',
      //   key: '3',
      //   render: (_, record) => {
      //     // console.log(record);
      //     return record.matter;
      //   },
      // },
      {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: '3',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.dueDate.length - b.dueDate.length,
        
      },
      {
        title: 'Action',
        dataIndex: 'status',
        key: '7',
        render: (_, record) => {
          return (
            <Popconfirm
              title="Mark as Incomplete"
              onConfirm={() => this.handelNonAction(record)}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Form.Check type="checkbox"  />
            </Popconfirm>
          );
        },
      },
      {
        title: 'Edit',
        dataIndex: 'edit',
        key: '6',
        render: (_, record) => {
          return (
            <Button onClick={() => this.EditHandler(record)}>Edit</Button>
          );
        },
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        key: '7',
        render: (_, record) => {
          return (
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => this.deleteHandler(record._id)}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          );
        },
      },
    ];
    
    render() {
      console.log(this.state.tableData)
      const { TabPane } = Tabs;
      const callback = (key) =>{
        console.log(key)
        
        if(key == 1){
          console.log("Key == 1")
          this.setState({
            tableData : this.state.upcomingData,
        
          })
          console.log(this.state.tableData)
        }else
        if(key == 2){
          console.log("Key == 2")
          this.setState({
            tableData : this.state.CompletedData,
        
          })
          console.log(this.state.tableData)
        }
        
        
      }
  
      return (
        <Spin size="large" spinning={this.state.spinning} >
          <div>
            <div className="d-flex mb-2 title-component-header">
              <div className="title-header-name">
                <h5>Task</h5>
              </div>
              <div className="d-flex extra-iteam-div">
                  <button
                      className="btn  btn-outline-primary   btn-sm"
                      onClick={this.exportPDF}
                  >
                      Export to Pdf
                  </button>
                  <ExportExcel dataSource={this.state.tableData || []} />
                  <button
                      className="btn  btn-outline-primary   btn-sm"
                      onClick={this.showModal}
                  >
                      ADD TASK
                  </button>
              </div> 
            </div>
          <Tabs
            defaultActiveKey="1"
            onChange={callback}
            className="card p-4 overflow-auto"
          >
            <TabPane tab="Upcoming Tasks" key="1">
              <UpcomingTasks
                columns={this.columns}
                tableData={this.state.upcomingData}
              />
            </TabPane>
            <TabPane tab="Completed Tasks" key="2">
              <CompletedTask
                columns={this.newcolumns}
                tableData={this.state.CompletedData}
              />
            </TabPane>
      
          </Tabs>
          <Modal
            title="Create New Task"
            visible={this.state.visible}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
            footer={[
              <Button  onClick={this.handleCancel}>
                Cancel
              </Button>,
              <Button type="primary" disabled = {this.state.disable} onClick={this.handleOk}>
                Create Task
              </Button>,
            ]}
          >
         <Form 
         className="form-details" 
         id='myForm'
         className="form"
         ref={ form => this.messageForm = form }
         >
          <Form.Group controlId="taskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Task Name"
              defaultValue={this.state.name}
              onChange={this.handleChange}
            />
          </Form.Group>
  
          <Form.Group controlId="dueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              required
              type="date"
              placeholder="Due Date"
              onChange={this.handleChange}
            />
          </Form.Group>
  
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows="3"
              onChange={this.handleChange}
            />
          </Form.Group>
  
        {/*
          <Form.Group controlId="taskName">
            <Form.Label>Assignee</Form.Label>
            <div>
              <Input addonBefore={selectBefore} size="large" suffix={<UserOutlined className="site-form-item-icon" />}  placeholder="Type a name..." />
            </div>
          </Form.Group>
        */
        }
  
          <Form.Group controlId="priority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              defaultValue="Normal"
              required
              onChange={this.handleChange}
            >
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="matter">
            <Form.Label>Matter</Form.Label>
            <Form.Control
              required
              as="select"
              onChange={this.handleChange}
              name="matter"
            >
              <option>Select a matter</option>
              {
              this.state.options.map((val)=>{
                  return val
                })
                }
            </Form.Control>
          </Form.Group>
          <br />
          {
            /*
              <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Notify me when the task is completed" />
          </Form.Group>
          <br />
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Notify assignee via email" />
          </Form.Group>
          <br />
            */
  
          }
         
        </Form>
     
          </Modal>
          <Modal
            title="Edit task"
            visible={this.state.editMode}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
            footer={[
              <Button  onClick={this.handleCancel}>
                Cancel
              </Button>,
              <Button type="primary" disabled = {this.state.disable} onClick={this.handleOk}>
                Update Task
              </Button>,
            ]}
          >
            <Form 
             id='myForm'
             className="form"
             ref={ form => this.messageForm = form }
            className="form-details">
                    <Form.Group controlId="taskName">
                      <Form.Label>Task Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        defaultValue={this.state.Data.taskName}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
  
                    <Form.Group controlId="dueDate">
                      <Form.Label>Due Date</Form.Label>
                      <Form.Control
                        type="date"
                        defaultValue={this.state.Data.dueDate ? this.state.Data.dueDate.substring(0,10) : ""}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
  
                    <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        required
                        defaultValue={this.state.Data.description}
                        as="textarea"
                        rows="3"
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="matter">
                              <Form.Label>Matter</Form.Label>
                              <Form.Control
                                required
                                as="select"
                                value={this.state.Data.matter}
                                onChange={this.handleChange}
                                name="matter"
                              >
                                <option>Select a matter</option>
                                {this.state.options.map((val)=>{
                                return val
                              })
                              }
                              </Form.Control>
                            </Form.Group>
  
                  {
                    /*
                      <Form.Group controlId="taskName">
                      <Form.Label>Assignee</Form.Label>
                      <div>
                        <Input addonBefore={selectBefore} size="large" suffix={<UserOutlined className="site-form-item-icon" />}  placeholder="Type a name..." />
                      </div>
                    </Form.Group>
                    */
                  }
  
                    <Form.Group controlId="priority">
                      <Form.Label>Priority</Form.Label>
                      <Form.Control
                        as="select"
                      
                        required
                        defaultValue={this.state.Data.priority}
                        onChange={this.handleChange}
                      >
                        <option>Low</option>
                        <option>Normal</option>
                        <option>High</option>
                      </Form.Control>
                    </Form.Group>
                    
                    <br />
                    {
                      /* 
                      <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Notify me when the task is completed" />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Notify assignee via email" />
                    </Form.Group>
                    <br />
                      */
                    }
                  </Form>
      
          </Modal>
        </div>
      
        </Spin>
        );
    }
  }
  
  const mapStateToProps = (state) => ({
    userId: state.user.token.user._id,
  });
  export default connect(mapStateToProps)(Tasks);
  