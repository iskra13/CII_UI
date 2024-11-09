import { CreateLegislationModal } from "./components/create-legislation-modal/create-legislation-modal";
import { UpdateLegislationModal } from "./components/update-legislation-modal/update-legislation-modal";
import { FC, useState, Key } from "react";
import { Button, Input, Layout, Menu, Table, Select } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { TableRowSelection } from "antd/es/table/interface";
import { useModal } from "../../hooks";
import { useChangesLegislation, useRole } from "../../store";

import "./styles/general.css";

const { Header, Sider, Content, Footer } = Layout;
const { Option } = Select;

export const General: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState("1");
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedKey, setSelectedKey] = useState("1");
  const { actions, legislations } = useChangesLegislation((state) => state);
  const { role } = useRole();

  const {
    isOpenModal: isOpenCreateLegislation,
    handleCloseModal: handleCloseModalCreateLegislation,
    handleOpenModal: handleOpenModalCreateLegislation,
  } = useModal();
  const {
    isOpenModal: isOpenEditLegislation,
    handleCloseModal: handleCloseModalEditLegislation,
    handleOpenModal: handleOpenModalEditLegislation,
  } = useModal();

  const [filterText, setFilterText] = useState("");
  const [searchField, setSearchField] = useState("nameChange"); // состояние для выбранного поля поиска

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
    setPage(key);
  };

  const columns: any = [
    {
      title: "Название изменения",
      dataIndex: "nameChange",
      key: "nameChange",
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Дата вступления в силу",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
    },
    {
      title: "Ссылка на источник",
      dataIndex: "sourceLink",
      key: "sourceLink",
      render: (text: any, record: any) => (
        <Button href={record.sourceLink} type="link">
          {record.sourceLink}
        </Button>
      ),
    },
    {
      title: "Категория",
      dataIndex: "category",
      key: "category",
    },
  ];

  if (role === "expert") {
    columns.push({
      title: "Редактировать",
      dataIndex: "change",
      key: "change",
      render: (text: any, record: any) => (
        <Button
          onClick={() => {
            handleOpenModalEditLegislation();
            actions.setCurrentEditLegislation(record.key);
          }}
          htmlType="button"
        >
          Редактировать
        </Button>
      ),
    });
  }

  const handleSearch = (e: any) => {
    setFilterText(e.target.value);
  };

  const handleSearchFieldChange = (value: string) => {
    setSearchField(value);
  };

  return (
    <>
      <Layout className="general-layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => handleMenuClick(key)}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Все записи",
                className: "menu-item",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Изменённые записи",
                className: "menu-item",
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="header site-layout-background">
            <div className="trigger" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? (
                <MenuUnfoldOutlined style={{ width: "100%", height: "100%" }} />
              ) : (
                <MenuFoldOutlined style={{ width: "100%", height: "100%" }} />
              )}
            </div>
            <div className="logo">Система для изменения законов</div>
          </Header>
          {page === "1" && (
            <Content
              className="main site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            > 
            <div className="search">
              <Input
                placeholder="Поиск по выбранному полю"
                value={filterText}
                onChange={handleSearch}
                style={{ marginBottom: 16 }}
              />
              <Select value={searchField} onChange={handleSearchFieldChange} style={{ marginBottom: 16 }}>
                <Option value="nameChange">Название изменения</Option>
                <Option value="description">Описание</Option>
                <Option value="effectiveDate">Дата вступления в силу</Option>
                <Option value="sourceLink">Ссылка на источник</Option>
                <Option value="category">Категория</Option>
              </Select>
            </div>
              {role === "expert" ? (
                <div className="table-buttons">
                  <Button
                    onClick={handleOpenModalCreateLegislation}
                    htmlType="button"
                    key="add"
                  >
                    Добавить изменение в законодательство
                  </Button>
                  <Button
                    onClick={() => {
                      actions.deleteLegislationRows(
                        selectedRowKeys as string[]
                      );
                      setSelectedRowKeys([]);
                    }}
                    htmlType="button"
                    key="delete"
                  >
                    Удалить выделенные изменения
                  </Button>
                </div>
              ) : null}
              <Table
                className="table"
                bordered={true}
                scroll={{
                  x: 1100,
                }}
                title={() => (
                  <div className="head-panel">
                    <div className="table-title">
                      Изменения в законодательстве
                    </div>
                  </div>
                )}
                columns={columns}
                rowSelection={role === "expert" ? rowSelection : undefined}
                dataSource={legislations.filter((item: any) => item[searchField]?.includes(filterText))}
              />
            </Content>
          )}
          {page === "2" && (
            <Content
              className="main site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              Вторая страница
            </Content>
          )}
          <Footer style={{ textAlign: "center" }}>Created by 2024</Footer>
        </Layout>
      </Layout>
      {isOpenCreateLegislation ? (
        <CreateLegislationModal
          onAddLegislation={actions.createLegislation}
          onClose={handleCloseModalCreateLegislation}
          isModalOpne={isOpenCreateLegislation}
        />
      ) : null}
      {isOpenEditLegislation ? (
        <UpdateLegislationModal
          isModalOpne={isOpenEditLegislation}
          onUpdateLegislation={actions.updateLegislation}
          onClose={handleCloseModalEditLegislation}
        />
      ) : null}
    </>
  );
};
