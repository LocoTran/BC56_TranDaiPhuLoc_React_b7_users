import React, { Component, createRef } from "react";
import { fetchUserAction } from "../../redux/action/userAction";
import { BASE_URL, SET_DATA_FORM } from "../../redux/constant/userConst";
import { connect } from "react-redux";
import { message } from "antd";
import axios from "axios";
import { validation } from "../../util/method";

class Form extends Component {
    inputRef = createRef();

    resetForm = () => {
        let user = {
            ...this.props.user,
            id: "",
            name: "",
            password: "",
            account: "",
        };
        this.props.handleData(user);
    };

    componentDidMount() {
        this.inputRef.current.focus();
    }

    handleOnChangeForm = (event) => {
        let { value, name } = event.target;
        let user = { ...this.props.user, [name]: value };
        this.props.handleData(user);
    };

    handleAddUser = () => {
        let { name, password, account } = this.props.user;

        let isValid = this.checkValid(name, password, account);
        if (!isValid) {
            return;
        }

        axios({
            url: BASE_URL,
            method: "POST",
            data: this.props.user,
        })
            .then((res) => {
                this.props.handleFetchUser();
                this.resetForm();
                message.success("Thêm người dùng thành công!");
            })
            .catch((err) => {
                console.log("🚀👾👽 ~ err:", err);
            });
    };

    checkValid = (name, pass, account) => {
        let valid = validation.isLetter(name, "notiName", "Tên người dùng");
        valid = valid & validation.isPassValid(pass, "notiPassword", 6, 10);
        valid =
            valid &
            validation.isContainLetterAndNumber(
                account,
                "notiAccount",
                "Tài khoản"
            );
        return valid;
    };

    handleDetail = (id) => {
        let newName = document.querySelector('[name = "name"]').value;
        let newPassword = document.querySelector('[name = "password"]').value;
        let newAccount = document.querySelector('[name = "account"]').value;

        let isValid = this.checkValid(newName, newPassword, newAccount);
        if (!isValid) {
            return;
        }

        let user = {
            ...this.props.user,
            name: newName,
            password: newPassword,
            account: newAccount,
        };
        this.props.handleData(user);

        axios({
            url: `${BASE_URL}/${id}`,
            method: "PUT",
            data: this.props.user,
        })
            .then((res) => {
                this.props.handleFetchUser();
                this.resetForm();
                message.success("Cập nhật thông tin thành công!");
            })
            .catch((err) => {
                console.log("🚀👾👽 ~ err:", err);
            });
    };

    render() {
        return (
            <div>
                <form action="" className="form pb-2">
                    <input
                        ref={this.inputRef}
                        type="text"
                        placeholder="Name"
                        className="form-control my-2 d-block"
                        name="name"
                        value={this.props.user.name}
                        onChange={this.handleOnChangeForm}
                    />
                    <span className="text-danger" id="notiName"></span>
                    <input
                        type="text"
                        placeholder="Account"
                        className="form-control my-2 d-block"
                        name="account"
                        value={this.props.user.account}
                        onChange={this.handleOnChangeForm}
                    />
                    <span className="text-danger" id="notiAccount"></span>
                    <input
                        type="text"
                        placeholder="Password"
                        className="form-control my-2 d-block"
                        name="password"
                        value={this.props.user.password}
                        onChange={this.handleOnChangeForm}
                    />
                    <span className="text-danger" id="notiPassword"></span>

                    <button
                        type="button"
                        className="btn btn-dark mr-2 mt-2"
                        onClick={this.handleAddUser}
                    >
                        Thêm
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary mt-2"
                        onClick={() => {
                            this.handleDetail(this.props.user.id);
                            let { name, password, account } = this.props.user;
                            document.querySelector('[name = "name"]').value =
                                name;
                            document.querySelector(
                                '[name = "password"]'
                            ).value = password;
                            document.querySelector('[name = "account"]').value =
                                account;
                        }}
                    >
                        Sửa
                    </button>
                </form>
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
        handleData: (user) => {
            dispatch({ type: SET_DATA_FORM, payload: user });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
