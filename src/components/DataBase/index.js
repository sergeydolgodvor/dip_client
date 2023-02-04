import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from 'antd';

import { fetchAllDocuments } from 'redux/actions/documentAction';
import DocumentCard from './DocumentCard';

import './index.scss';

const DataBase = () => {
  const { token, documents } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDocuments(token));
  }, [documents.allDocuments]);

  const EMFFaculties = (arr) => {
    const newArr = arr.map((element) => {
      if (element.faculty.includes('ЭМФ')) {
        return element;
      }
    });
    return newArr.filter((element) => element !== undefined);
  };

  const GTFFaculties = (arr) => {
    const newArr = arr.map((element) => {
      if (element.faculty.includes('ГТФ')) {
        return element;
      }
    });
    return newArr.filter((element) => element !== undefined);
  };

  const IMAFaculties = (arr) => {
    const newArr = arr.map((element) => {
      if (element.faculty.includes('ИМА')) {
        return element;
      }
    });
    return newArr.filter((element) => element !== undefined);
  };

  const SMFFaculties = (arr) => {
    const newArr = arr.map((element) => {
      if (element.faculty.includes('СМФ')) {
        return element;
      }
    });
    return newArr.filter((element) => element !== undefined);
  };

  const FUFTFaculties = (arr) => {
    const newArr = arr.map((element) => {
      if (element.faculty.includes('ФУВТ')) {
        return element;
      }
    });
    return newArr.filter((element) => element !== undefined);
  };

  // Tabs
  const { TabPane } = Tabs;

  return (
    <section className="data-base">
      <h2>База данных всех документов</h2>

      <Tabs defaultActiveKey="1" centered type="line">
        <TabPane tab="ЭМФ" key="1">
          <DocumentCard
            filterFaculty={EMFFaculties(documents.allDocuments)}
          />
        </TabPane>

        <TabPane tab="ГТФ" key="2">
          <DocumentCard
            filterFaculty={GTFFaculties(documents.allDocuments)}
          />
        </TabPane>

        <TabPane tab="ИМА" key="3">
          <DocumentCard
            filterFaculty={IMAFaculties(documents.allDocuments)}
          />
        </TabPane>

        <TabPane tab="СМФ" key="4">
          <DocumentCard
            filterFaculty={SMFFaculties(documents.allDocuments)}
          />
        </TabPane>

        <TabPane tab="ФУВТ" key="5">
          <DocumentCard
            filterFaculty={FUFTFaculties(documents.allDocuments)}
          />
        </TabPane>
      </Tabs>
    </section>
  );
};

export default DataBase;
