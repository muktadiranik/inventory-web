import React, { useEffect, useRef, useState } from "react";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getEditorListAction,
  deleteEditorAction,
} from "../../redux/actions/editorActions";
import { getGroupListAction } from "../../redux/actions/authActions";
import AddEditor from "./AddEditor";
import UpdateEditor from "./UpdateEditor";
import { toast } from "react-toastify";
import "./profile.css";

const Editor = () => {
  const dispatch = useDispatch();

  const { company } = useSelector((state) => state.companyReducer);
  const {
    editorList,
    addedEditor,
    updatedEditor,
    success,
    error,
    deleteSuccess,
    deleteError,
  } = useSelector((state) => state.editorReducer);
  const { groupList, userPreference } = useSelector(
    (state) => state.userReducer
  );

  const ref1 = useRef(false);
  const ref2 = useRef(false);
  const ref3 = useRef(false);

  const [editorObject, setEditorObject] = useState({});

  useEffect(() => {
    if (company) {
      if (company.id) {
        dispatch(getEditorListAction(company.id));
      }
    }
    dispatch(getGroupListAction());
  }, []);

  useEffect(() => {
    if (ref1.current) {
      if (company) {
        if (company.id) {
          dispatch(getEditorListAction(company.id));
        }
      }
    }
    ref1.current = true;
  }, [company, addedEditor, updatedEditor, deleteSuccess]);

  useEffect(() => {
    if (ref2.current) {
      if (error) {
        if (error.response.data) {
          for (const key in error.response.data) {
            if (error.response.data.hasOwnProperty(key)) {
              const element = error.response.data[key];
              toast.error(`${key}: ${element[0]}`);
            }
          }
        }
        return;
      }
      if (success) {
        if (addedEditor) {
          if (addedEditor.email) toast.success("Editor added successfully");
        }
      }
    }
    ref2.current = true;
  }, [addedEditor, updatedEditor, success, error, deleteSuccess, deleteError]);

  useEffect(() => {
    if (ref2.current) {
      if (success) {
        if (updatedEditor) {
          if (updatedEditor.id) toast.success("Editor updated successfully");
        }
        return;
      }
    }
    ref2.current = true;
  }, [updatedEditor, error, success]);

  useEffect(() => {
    if (ref3.current) {
      if (error) {
        if (error.response.data) {
          for (const key in error.response.data) {
            if (error.response.data.hasOwnProperty(key)) {
              const element = error.response.data[key];
              toast.error(`${key}: ${element[0]}`);
            }
          }
        }
        return;
      }
      if (deleteSuccess) {
        toast.success("Editor deleted successfully");
      }
    }
    ref3.current = true;
  }, [deleteError, deleteSuccess]);

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.leavetype.length - b.leavetype.length,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.from.length - b.from.length,
    },
    {
      title: "Action",
      render: (row) => (
        <div className="btn btn-group">
          <button
            className=" btn action-btn-all"
            onClick={() => {
              const confirm = window.confirm(
                "Are you sure you want to delete this editor?"
              );
              if (confirm) {
                dispatch(deleteEditorAction(company.id, row.id));
              }
            }}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
          <a
            href="#"
            className=" btn action-btn-all"
            role="button"
            data-bs-toggle="modal"
            data-bs-target="#update_editor"
            onClick={() => {
              setEditorObject(row);
            }}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </a>
        </div>
      ),
    },
  ];

  const columnsBangla = [
    {
      title: "নামের প্রথম অংশ",
      dataIndex: "first_name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "নামের শেষ অংশ",
      dataIndex: "last_name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "ইমেইল",
      dataIndex: "email",
      sorter: (a, b) => a.leavetype.length - b.leavetype.length,
    },
    {
      title: "ফোন",
      dataIndex: "phone",
      sorter: (a, b) => a.from.length - b.from.length,
    },
    {
      title: "অ্যাকশন",
      render: (row) => (
        <div className="btn btn-group">
          <button
            className=" btn action-btn-all"
            onClick={() => {
              const confirm = window.confirm(
                "Are you sure you want to delete this editor?"
              );
              if (confirm) {
                dispatch(deleteEditorAction(company.id, row.id));
              }
            }}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
          <a
            href="#"
            className=" btn action-btn-all"
            role="button"
            data-bs-toggle="modal"
            data-bs-target="#update_editor"
            onClick={() => {
              setEditorObject(row);
            }}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </a>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className=" col-md-6">
        <div className="container-fluid">
          <div className="page-header">
            <div className="row align-items-center mt-2">
              <div className="col">
                <ul className="breadcrumb">
                  <h3>
                    {userPreference && userPreference.language_name === "EN"
                      ? "Editors"
                      : "ইডিটর"}
                  </h3>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  href="#"
                  className="btn add-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#add_editor"
                >
                  <i className="fa fa-plus" />
                  {userPreference && userPreference.language_name === "EN"
                    ? "Add Editor"
                    : "ইডিটর যোগ করুন"}
                </a>
              </div>
            </div>
          </div>
        </div>
        {groupList && groupList.length > 0 && (
          <AddEditor groupList={groupList} />
        )}
        {groupList && groupList.length > 0 && editorObject && (
          <UpdateEditor groupList={groupList} editorObject={editorObject} />
        )}
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                {editorList && (
                  <Table
                    className="table-striped"
                    pagination={{
                      total: editorList.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    style={{ overflowX: "auto" }}
                    columns={
                      userPreference && userPreference.language_name === "EN"
                        ? columns
                        : columnsBangla
                    }
                    dataSource={editorList}
                    rowKey={(record) => record.id}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
