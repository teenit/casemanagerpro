import { Component } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import SearchInput from "../elements/Inputs/SearchInput";
import AddButton from "../elements/Buttons/AddButton";
import { LANG } from "../../services/config";
import ResourceModal from "../Resources/ResourceModal";
import AccessCheck from "../Functions/AccessCheck";
import HeaderFormatter from "../elements/HeaderFormatter/HeaderFormatter";
import TextDescription from "../elements/TextFormatters/TextDescription";
import { Box } from "@mui/system";
import { Tab, Tabs } from "@mui/material";
import Table from "../elements/Table/Table";
import EmptyData from "../EmptyData/EmptyData";
import ActionMenu from "../Portals/ActionMenu";
import { apiResponse } from "../Functions/get_apiObj";
import Pagination from "../elements/Pagination/Pagination";
import ModalConfirm from "../Modals/ModalConfirm"
import EditResourcesModal from "../Modals/Resources/EditResourcesModal";
import ResourcesModal from "../Resources/ResourcesModal";
import docxImg from "./../../img/resources/docx.svg";
import mp3Img from "./../../img/resources/mp3.svg";
import pdfImg from "./../../img/resources/pdf.svg";
import pptxImg from "./../../img/resources/pptx.svg";
import xlsxImg from "./../../img/resources/xlsx.svg";
import codeImg from "./../../img/resources/code.svg";
import zipImg from "./../../img/resources/zip.svg";
import imgImg from "./../../img/resources/img.svg";
import Icon from "../elements/Icons/Icon";
class ResourcesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      search: "",
      tabValue: 0,
      modals: {
        add_resource: false,
        edit_resource: false,
        confirm_delete: false,
        open: false
      },
      access: {},
      sort: {
        field: "id",
        order: "DESC",
      },
      options: {
        page: 0,
        limit: 10,
      },
      files: [],
      totalCount: 0,
      users: {},
      current_resource: null,
    };
  }

  get tabData() {
    return [
      { title: LANG.resources.tabs.all, value: 0, mode: "all" },
      { title: LANG.resources.tabs.docs, value: 1, mode: "documents" },
      { title: LANG.resources.tabs.media, value: 2, mode: "media" },
      { title: LANG.resources.tabs.links, value: 3, mode: "links" },
    ];
  }

  componentDidMount() {
    let tabIndex = this.tabData.findIndex(
      (tab) => tab.mode === localStorage.getItem("resources_mode")
    );
    tabIndex = tabIndex < 0 ? 0 : tabIndex;
    const mode = this.tabData[tabIndex].mode;
    const key = `resources_filter_${mode}`;
    const savedFilters = JSON.parse(localStorage.getItem(key)) || {};

    this.setState(
      {
        tabValue: tabIndex,
        sort: {
          field: savedFilters.sortField || "id",
          order: savedFilters.sortOrder || "DESC",
        },
        options: {
          page: savedFilters.page || 0,
          limit: savedFilters.limit || 10,
        },
        search: savedFilters.search || "",
        access: {
          upload: () => AccessCheck("yes_no", "a_page_resources_upload"),
          remove: () => AccessCheck("yes_no", "a_page_resources_remove"),
          edit: () => AccessCheck("yes_no", "a_page_resources_edit"),
        },
      },
      () => {
        this.loadResources();
        this.getUsers();
      }
    );
  }

  storageHandler = () => {
    const mode = this.tabData[this.state.tabValue]?.mode;
    const key = `resources_filter_${mode}`;
    const storageObj = {
      sortField: this.state.sort.field,
      sortOrder: this.state.sort.order,
      search: this.state.search,
      page: this.state.options.page,
      limit: this.state.options.limit,
    };
    localStorage.setItem(key, JSON.stringify(storageObj));
  };

  loadResources = () => {
    this.setState({ loading: true });
    const mode = this.tabData[this.state.tabValue]?.mode;
    const obj = {
      action: "get_resources",
      main_mode: mode,
      sort: this.state.sort.order,
      order: this.state.sort.field,
      search: this.state.search,
      page: this.state.options.page + 1,
      limit: this.state.options.limit,
    };

    apiResponse(obj, "resources/get-resource.php").then((res) => {
      this.setState(
        {
          files: res,
          loading: false,
        },
        () => {
          const total = res.data_total || res.length;
          this.setState({ totalCount: total });
        }
      );
    }).catch(() => {
      this.setState({ loading: false });
    });
  };

  loadTotalCount = () => {
    const mode = this.tabData[this.state.tabValue]?.mode;
    apiResponse({ action: "get_total_count", main_mode: mode }, "resources/get-resource.php").then((res) => {
      if (res.status) {
        this.setState({ totalCount: res.data?.total || 0 });
      }
    });
  };

  getUsers = () => {
    apiResponse({ action: "get_users_list" }, "user/users.php").then((res) => {
      this.setState({ users: res.data || {} });
    });
  };


  deleteResource = () => {
    apiResponse({ resource_id: this.state.current_resource.resource_id }, "resources/delete-resource.php").then((res) => {
      this.loadResources()
    }).catch((error) => {

    })
  }

  modalHandler = (key) => {
    this.setState({ modals: { ...this.state.modals, [key]: !this.state.modals[key] } });
  };

  handleSortClick = (field) => {
    const { sort } = this.state;
    const newOrder = sort.field === field && sort.order === "ASC" ? "DESC" : "ASC";
    this.setState({ sort: { field, order: newOrder } }, () => {
      this.storageHandler();
      this.loadResources();
    });
  };

  tabHandler = (event, value) => {
    const mode = this.tabData[value]?.mode;
    localStorage.setItem("resources_mode", mode);

    const key = `resources_filter_${mode}`;
    const savedFilters = JSON.parse(localStorage.getItem(key)) || {};
    this.setState(
      {
        tabValue: value,
        sort: {
          field: savedFilters.sortField || "id",
          order: savedFilters.sortOrder || "DESC",
        },
        options: {
          page: savedFilters.page || 0,
          limit: savedFilters.limit || 10,
        },
        search: savedFilters.search || "",
      },
      () => {
        this.loadResources();
      }
    );
  };

  searchHandler(value) {
    this.setState({ search: value, options: { ...this.state.options, page: 0 } }, () => {
      this.storageHandler();
      this.loadResources();
    });
  }

  handleNextPage = () => {
    this.setState(
      (prev) => ({ options: { ...prev.options, page: prev.options.page + 1 } }),
      () => {
        this.storageHandler();
        this.loadResources();
      }
    );
  };

  handlePrevPage = () => {
    this.setState(
      (prev) => ({ options: { ...prev.options, page: Math.max(prev.options.page - 1, 0) } }),
      () => {
        this.storageHandler();
        this.loadResources();
      }
    );
  };

  handleChangeRowsPerPage = (newLimit) => {
    this.setState(
      (prev) => ({ options: { ...prev.options, page: 0, limit: newLimit } }),
      () => {
        this.storageHandler();
        this.loadResources();
      }
    );
  };

  cutTitle = (str = "", length) => {
    return str.length > length ? str.slice(0, length) + "..." : str;
  };

  convertSize = (size) => {
    if (!size && size !== 0) return "";
    if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + " KB";
    } else {
      return (size / (1024 * 1024)).toFixed(2) + " MB";
    }
  };
  getPreview = (resource) => {
    switch (resource.type) {
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return docxImg;
      case "application/pdf":
        return pdfImg;
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return pptxImg;
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return xlsxImg;
      case "audio/mpeg":
        return mp3Img;
      case "application/zip":
      case "application/x-rar-compressed":
      case "application/x-7z-compressed":
        return zipImg;
      case "text/html":
      case "text/css":
      case "application/javascript":
      case "application/json":
      case "application/x-python-code":
      case "application/x-java":
        return codeImg;
      case "image/png":
      case "image/jpg":
      case "image/jpeg":
      case "image/svg":
      case "image/webp":
        return imgImg;
      default:
        return "";
    }
  }
  get tableColumns() {
    const { edit, remove } = this.state.access;
    return [
      {
        dataField: "resource_id",
        text: "ID",
        sort: true,
        fixed: false,
        isHidden: false,
        headerFormatter: () => (
          <HeaderFormatter
            text="ID"
            dataField="resource_id"
            sortField={this.state.sort.field}
            sortOrder={this.state.sort.order}
            onSortClick={this.handleSortClick}
          />
        ),
      },
      {
        dataField: "preview",
        text: LANG.GLOBAL.type,
        sort: true,
        fixed: false,
        isHidden: false,
        formatter: (cell, row) => {
          return row.type === "link" ? <Icon icon="eye" addClass="default-icon" /> : <img src={this.getPreview(row)} alt={row.title} />
        }
      },
      {
        dataField: "title",
        text: LANG.GLOBAL.title,
        sort: true,
        formatter: (cell, row) => {
          return row.type === "link" ? <a href={row.link} target="_blank">{this.cutTitle(row.title)}</a>
            : <div style={{ cursor: "pointer" }} onClick={() => {
              this.setState({ current_resource: row }, this.modalHandler("open"))
            }}>{this.cutTitle(row.title)}</div>
        },
        headerFormatter: () => (
          <HeaderFormatter
            text={LANG.GLOBAL.title}
            dataField="title"
            sortField={this.state.sort.field}
            sortOrder={this.state.sort.order}
            onSortClick={this.handleSortClick}
          />
        ),
      },
      {
        dataField: "description",
        text: LANG.GLOBAL.description,
        sort: false,
        formatter: (cell) => (
          <div style={{ maxHeight: "50px", maxWidth: "300px", overflow: "hidden" }}>
            <TextDescription text={cell || LANG.GLOBAL.no_description} />
          </div>
        ),
      },
      {
        dataField: "size",
        text: LANG.GLOBAL.size,
        sort: false,
        formatter: (cell) => <div>{this.convertSize(cell)}</div>,
      },
      {
        dataField: "uploaded_at",
        text: LANG.resources.uploaded_at,
        sort: true,
        headerFormatter: () => (
          <HeaderFormatter
            text={LANG.resources.uploaded_at}
            dataField="uploaded_at"
            sortField={this.state.sort.field}
            sortOrder={this.state.sort.order}
            onSortClick={this.handleSortClick}
          />
        ),
        formatter: (cell) => <div>{cell && moment(cell).format("DD-MM-YYYY HH:mm")}</div>,
      },
      {
        dataField: "who_uploaded",
        text: LANG.resources.who_uploaded,
        sort: false,
        headerFormatter: () => (
          <HeaderFormatter
            text={LANG.resources.who_uploaded}
            dataField="who_uploaded"
            sortField={this.state.sort.field}
            sortOrder={this.state.sort.order}
            onSortClick={this.handleSortClick}
          />
        ),
        formatter: (cell, row) => {
          const name = this.state.users[row.user_id] || LANG.GLOBAL.unknown_user;
          return <NavLink to={`/user/${row.user_id}`}>{name}</NavLink>;
        },
      },
      {
        dataField: "row_menu",
        text: "",
        fixed: false,
        formatter: (cell, row) => {

          const menuItems = [
            edit && {
              title: LANG.GLOBAL.edit,
              isHidden: false,
              icon: "edit",
              click: () => {
                this.setState({ current_resource: row }, () => this.modalHandler("edit_resource"));
              },
            },
            // download && row.type!=="link"&&{
            //   title: LANG.GLOBAL.download,
            //   isHidden: false,
            //   icon: "download",
            //   click:()=>{
            //     window.open(row.link, "_blank");
            //   }
            // },
            remove && {
              title: LANG.GLOBAL.delete,
              isHidden: false,
              icon: "delete",
              color: "error",
              click: () => {
                this.setState({ current_resource: row }, () => this.modalHandler("confirm_delete"));
              },
            },
          ].filter(Boolean);

          return <ActionMenu menuItems={menuItems} />;
        },
      },
    ];
  }

  render() {
    const { loading, modals, access, files, options, totalCount } = this.state;

    return !loading && (
      <div className="ResourcesPage">
        <div className="ResourcesPage-header" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <SearchInput handler={(data) => { this.searchHandler(data); }} value={this.state.search} key={this.state.tabValue} />
          {access.upload && <AddButton title={LANG.resources.add} click={() => { this.modalHandler("add_resource"); }} />}
        </div>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto", whiteSpace: "nowrap" }}>
            <Tabs value={this.state.tabValue} onChange={this.tabHandler} variant="scrollable" scrollButtons="auto">
              {this.tabData.map((item, index) => (
                <Tab key={index} label={item.title} value={item.value} />
              ))}
            </Tabs>
          </Box>

          <div role="tabpanel" style={{ paddingTop: "15px" }}>
            <Table
              loading={this.state.loading}
              columns={this.tableColumns}
              data={files}
              keyField="id"
              sortField={this.state.sort.field}
              sortOrder={this.state.sort.order}
              emptyTable={
                <EmptyData
                  access={access.upload}
                  title={LANG.resources.no_files}
                  buttonText={LANG.resources.add_first_file}
                  click={() => { this.modalHandler("add_resource"); }}
                />
              }
            />
          </div>
        </Box>

        <div className="ResourcesPage-pagination" style={{ marginTop: 12 }}>
          {files.length > 0 && (
            <Pagination
              page={options.page}
              count={files.length}
              nextPage={this.handleNextPage}
              prewPage={this.handlePrevPage}
              rowsPerPage={options.limit}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 25, 50, 100]}
              totalCount={totalCount}
              loadTotalCount={this.loadTotalCount}
            />
          )}
        </div>

        {modals.add_resource && <ResourceModal close={() => { this.modalHandler("add_resource") }} loadResources={this.loadResources} />}
        {modals.edit_resource && <EditResourcesModal close={() => { this.modalHandler("edit_resource") }}
          resource={this.state.current_resource} loadResources={this.loadResources} />}
        {modals.confirm_delete && <ModalConfirm closeHandler={() => { this.modalHandler("confirm_delete") }}
          text={LANG.resources.confirm_delete + this.state.current_resource.title + "?"} successHandler={this.deleteResource} />}
        {modals.open && <ResourcesModal info={this.state.current_resource} close={() => { this.modalHandler("open") }} />}
      </div>
    );
  }
}

export default ResourcesPage;
