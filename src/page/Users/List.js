import React, { Component } from "react";
import { fetchUserAction } from "../../redux/action/userAction";
import { BASE_URL, GET_DETAIL } from "../../redux/constant/userConst";
import { connect } from "react-redux";
import axios from "axios";
import { Button, Modal, message } from "antd";

class List extends Component {
    state = {
        visible: false,
    };

    showModal = (callback) => {
        this.setState({
            visible: true,
            callback,
        });
    };

    handleOk = () => {
        const callback = this.state.callback;
        if (callback) {
            callback();
        }
        this.setState({
            visible: false,
            callback: null,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            callback: null,
        });
    };

    componentDidMount() {
        this.props.handleFetchUser();
    }

    handleDelete = (id) => {
        const callback = () => {
            axios
                .delete(`${BASE_URL}/${id}`)
                .then((res) => {
                    this.props.handleFetchUser();
                    message.success("Đã xóa người dùng!");
                })
                .catch((err) => {
                    console.log("🚀👾👽 ~ err:", err);
                });
        };
        this.showModal(callback);
    };

    handleViewDetail = (id) => {
        axios({
            url: `${BASE_URL}/${id}`,
            method: "GET",
        })
            .then((res) => {
                this.props.handleFetchDetail(res.data);
            })
            .catch((err) => {
                console.log("🚀👾👽 ~ err:", err);
            });
    };

    renderListUser = (arr) => {
        return arr
            .map(({ id, account, name, password }, index) => {
                return (
                    <tr key={index}>
                        <td>{id}</td>
                        <td>{account}</td>
                        <td>{name}</td>
                        <td>{password}</td>
                        <td>
                            <button
                                className="btn btn-danger mr-2"
                                onClick={() => {
                                    this.handleDelete(id);
                                }}
                            >
                                Delete
                            </button>
                            <button
                                className="btn btn-info"
                                onClick={() => {
                                    this.handleViewDetail(id);
                                }}
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                );
            })
            .reverse();
    };

    render() {
        return (
            <div>
                <Modal
                    title="Xác nhận xóa"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
                </Modal>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Account</th>
                            <th>Name</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderListUser(this.props.userArr)}</tbody>
                </table>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        userArr: state.userReducer.userArr,
        user: state.userReducer.user,
    };
};
let mapDispatchToProps = (dispatch) => {
    return {
        handleFetchUser: () => {
            dispatch(fetchUserAction());
        },
        handleFetchDetail: (user) => {
            dispatch({ type: GET_DETAIL, payload: user });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
