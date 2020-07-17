import React from 'react';
import { Table, Button, Input, Space, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words';
import api from '../../../resources/api';
import { connect } from 'react-redux';

let response = {};
let tableData = [];

class matterManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      tableData: [],
      searchData: [],
    };
  }

  async componentDidMount() {
    window.localStorage.setItem('total' , this.state.total)
    const data = [];
    await api
      .get('/matter/viewforuser/' + this.props.userId)
      .then((res) => (response = res.data.data));
    response.map((value, index) => {
      let newData = {
        key: index,
        id: value._id,
        matterDescription: value.matterDescription,
        Client: value.client.firstName + " " + value.client.lastName ,
        PractiseArea: value.practiseArea?  value.practiseArea : "-",
        OpenDate: value.openDate ? value.openDate : "-",
      };
      data.push(newData);
    });
    if (this.state.tableData != []) {
      this.setState({ tableData: data });
    }
  }

  render() {
    //Search Related

    /*
  useEffect(() => {
    
    async function fetchData() {
     response = await api.get('/contact/showall')
      setTable()
    }
    fetchData();
  }, []);
 */

    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
              // console.log('Node',node)
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) => {
        console.log(dataIndex, record);
        return record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      },

      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: (text) =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    });

    //   const handleciSelect = (record) => {
    //     // dispatch(selectBlog(record))
    //     // this.props.history.push('/lawyer/details')
    //   }

    const handleAddNew = (type) => {
      //  dispatch(selectBlog())
      this.props.history.push('/manage/Matter/add');
    };

    const handleEdit = (record) => {
      this.props.history.push('/edit/matter', record.id);
    };

    const handleDelete = (record) => {
      api
        .get('/matter/delete/' + record.id)
        .then(() => notification.success({ message: 'Matter deleted.' }))
        .catch(() => notification.error({ message: 'Failed to delete' }));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    };

    const columns = [
      {
        title: 'Matter Description',
        dataIndex: 'matterDescription',
        key: '_id',
        defaultSortOrder: 'descend',
        ...getColumnSearchProps('matterDescription'),
        sorter: (a, b, c) =>
          c === 'ascend'
            ? a.description < b.description
            : a.description > b.description,
      },
      {
        title: 'Client',
        dataIndex: 'Client',
        key: '_id',
        defaultSortOrder: 'ascend',
        ...getColumnSearchProps('Client'),
        sorter: (a, b, c) =>
          c === 'ascend'
            ? a.shortDescription < b.shortDescription
            : a.shortDescription > b.shortDescription,
      },
      {
        title: 'Practise Area',
        dataIndex: 'PractiseArea',
        key: '_id',
        ...getColumnSearchProps('PractiseArea'),
        sorter: (a, b, c) =>
          c === 'ascend'
            ? a.shortDescription < b.shortDescription
            : a.shortDescription > b.shortDescription,
      },
      {
        title: 'Open Date',
        dataIndex: 'OpenDate',
        key: '_id',
        ...getColumnSearchProps('OpenDate'),
        sorter: (a, b, c) =>
          c === 'ascend'
            ? a.shortDescription < b.shortDescription
            : a.shortDescription > b.shortDescription,
      },
      {
        title: 'Edit',
        dataIndex: 'edit',
        key: '_id',
        render: (_, record) => {
          return (
            <Button color="warning" onClick={() => handleEdit(record)}>
              Edit
            </Button>
          );
        },
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        key: '_id',
        render: (_, record) => {
          return (
            <Button variant="danger" onClick={() => handleDelete(record)}>
              Delete
            </Button>
          );
        },
      },
    ];

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      const newSearchData = [];
      this.state.tableData.map((value, index) => {
        if (value[dataIndex] == selectedKeys) {
          let newdata = {
            key: index,
            matterDescription: value.matterDescription,
            Client: value.Client,
            PractiseArea: value.PractiseArea,
            OpenDate: value.OpenDate,
          };
          newSearchData.push(newdata);
        }
      });

      this.setState({ tableData: newSearchData });
    };

    const handleReset = (clearFilters) => {
      clearFilters();
      this.setState({ searchText: '' });
      this.setState({ tableData: tableData, searchData: [] });
    };

    const handleView = (rec) => {
      let data = {};
      data.id = response[rec.key]._id;
      data.userId = this.props.userId;
      data.matters = this.state.tableData;
      this.props.history.push('/view/matter', data);
    };

    return (
      <div>
        <div className="p-2 ">
          <Button
            className="ml-auto"
            color="success"
            onClick={() => handleAddNew()}
          >
            Add Matter
          </Button>
        </div>
        <Table
          dataSource={this.state.tableData}
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: () => handleView(record), // double click row
              onContextMenu: (event) => {}, // right button click row
              onMouseEnter: (event) => {}, // mouse enter row
              onMouseLeave: (event) => {}, // mouse leave row
            };
          }}
        ></Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.token.user._id,
});
export default connect(mapStateToProps)(matterManage);
