import React from "react";
import clsx from "clsx";
import "./Table.css";
import NotFound from "../NotFound/NotFound";

export interface ITableHeader {
  key: string;
  text: React.ReactNode;
  render?: (any: any) => React.ReactNode;
  renderHeader?: (any: any) => React.ReactNode;
  width?: string;
  align?: string;
  sortValue?: any;
}

export interface ITable {
  headers: ITableHeader[];
  rowElement?: any;
  rowElementProps?: any;
  items: Array<any>;
  footer?: any;
  className?: string;
  loading?: boolean;
  theadClassName?: string;
  theadStyle?: any;
  rowClassName?: string;
  isSelectedRow?: (item: any) => any;
  onClick?: (item: any) => void;
  containerFluidClassName?: string;
  loadingTemplate?: any;
  thClassName?: string;
  afterRow?: any;
}

const TableNotFound = React.memo(() => {
  return (
    <div>
      <NotFound />
    </div>
  );
});
TableNotFound.displayName = "TableNotFound";

const TableLoading = ({ colSpan, template: Template }: { colSpan: number; template?: any }) => {
  if (Template) {
    return <Template />;
  }

  return (
    <tr>
      <td colSpan={colSpan} className="py-5 px-8 text-center">
        Yükleniyor
      </td>
    </tr>
  );
};

const TableCell = ({ children }: { children: React.ReactNode }) => {
  return <div className="cell text-h6">{children}</div>;
};

const TableRow = ({ children, ...etc }: any) => {
  return <div {...etc}>{children}</div>;
};

const Table = ({
  headers = [],
  items = [],
  className = "",
  loading = false,
  theadClassName,
  theadStyle = {},
  isSelectedRow,
  onClick,
  rowClassName,
  rowElement,
  rowElementProps,
  loadingTemplate,
  containerFluidClassName,
  thClassName,
  afterRow,
  ...props
}: ITable) => {
  const _getHeaders = headers.map((header, i) => (
    <div className={clsx("th text-headline-01", thClassName)} style={{ maxWidth: header.width, minWidth: header.width, justifyContent: header.align }} key={`th_${header.key.toString()}_${i}`}>
      {header.renderHeader ? header.renderHeader(header) : header.text}
    </div>
  ));
  const _getItems = items.map((item, k) => {
    const RowElement = rowElement ?? TableRow;

    return (
      <React.Fragment key={`parentRow_${k.toString()}`}>
        {item.beforeRow ? (
          <div className="tr" key={`beforeRow_${k.toString()}`}>
            <td colSpan={headers.length} className="py-5 px-8 text-left">
              {item.beforeRow}
            </td>
          </div>
        ) : (
          <></>
        )}
        <RowElement
          {...(rowElementProps ? rowElementProps(item) : {})}
          onClick={() => {
            if (onClick) {
              onClick(item);
            }
          }}
          className={clsx("tr", rowClassName, isSelectedRow && isSelectedRow(item) ? "active" : "")}
          key={`row_${k.toString()}`}
        >
          {headers.map((header) => {
            const key = `cell_${header.key}_${k.toString()}`;

            return (
              <div className="td" style={{ maxWidth: header.width, minWidth: header.width, justifyContent: header.align }} key={key}>
                {header.render ? header.render(item) : <TableCell>{item[header.key]}</TableCell>}
              </div>
            );
          })}
        </RowElement>
        {afterRow ? (
          <div key={`afterRow_${k.toString()}`} className={"tr after"}>
            <td colSpan={headers.length} className="py-5 px-8 text-left">
              {afterRow(item)}
            </td>
          </div>
        ) : (
          <></>
        )}
      </React.Fragment>
    );
  });

  return (
    <div>
      <div className={clsx("table", className)} {...props}>
        <div data-testid="tableHeader" className={clsx("thead", theadClassName)} style={{ ...theadStyle }}>
          <div className={clsx("container-fluid", containerFluidClassName)}>
            <div className="tr">{_getHeaders}</div>
          </div>
        </div>
        <div data-testid="tableBody" className={clsx("tbody container-fluid", containerFluidClassName)}>
          {loading ? <TableLoading template={loadingTemplate} colSpan={headers.length} /> : items.length ? _getItems : <TableNotFound />}
        </div>
        <div className="container-fluid">{props.footer && <div className={clsx("tfoot")}>{props.footer}</div>}</div>
      </div>
    </div>
  );
};

export default Object.assign(Table, {
  Cell: TableCell,
});
