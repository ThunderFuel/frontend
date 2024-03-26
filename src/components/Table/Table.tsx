import React from "react";
import clsx from "clsx";
import "./Table.css";
import NotFound from "../NotFound/NotFound";
import { useIsMobile } from "hooks/useIsMobile";

export interface ITableHeader {
  key: string;
  text: React.ReactNode;
  render?: (any: any) => React.ReactNode;
  renderHeader?: (any: any) => React.ReactNode;
  width?: string;
  align?: string;
  sortValue?: any;
  minWidth?: any;
  isHidden?: any;
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
  actionButton?: any;
  ButtonBelowHeader?: any;
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
  actionButton,
  ButtonBelowHeader,
  ...props
}: ITable) => {
  const isMobile = useIsMobile();
  const _getAfterRow = (k: number, item: any) => {
    if (!afterRow) {
      return false;
    }
    const afterRowContent = afterRow(item);
    if (!afterRowContent) {
      return false;
    }

    return (
      <div key={`afterRow_${k.toString()}`} className={"tr after"}>
        <div className="after-container">{afterRowContent}</div>
      </div>
    );
  };
  const filteredHeaders = headers.filter((h) => !h.isHidden);

  const _getHeaders = filteredHeaders.map((header, i) => {
    const width = isMobile ? header.minWidth || "100px" : header.width;
    const style = { maxWidth: width, minWidth: width, justifyContent: header.align };

    return (
      <div className={clsx("th text-headline-01", thClassName)} style={style} key={`th_${header.key.toString()}_${i}`}>
        {header.renderHeader ? header.renderHeader(header) : header.text}
      </div>
    );
  });
  const _getItems = items.map((item, k) => {
    const RowElement = rowElement ?? TableRow;

    return (
      <div className="tr-group" key={`parentRow_${k.toString()}`}>
        {item.beforeRow ? (
          <div className="tr" key={`beforeRow_${k.toString()}`}>
            <td colSpan={filteredHeaders.length} className="py-5 px-8 text-left">
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
          {filteredHeaders.map((header) => {
            const key = `cell_${header.key}_${k.toString()}`;
            const width = isMobile ? header.minWidth || "100px" : header.width;
            const style = { maxWidth: width, minWidth: width, justifyContent: header.align };

            return (
              <div className="td" style={style} key={key}>
                {header.render ? header.render(item) : <TableCell>{item[header.key]}</TableCell>}
              </div>
            );
          })}
        </RowElement>
        {_getAfterRow(k, item)}
      </div>
    );
  });

  return (
    <div className="overflow-hidden overflow-x-scroll lg:overflow-none border-y border-gray lg:border-none">
      <div className={clsx("fuel-table", className)} {...props}>
        <div data-testid="tableHeader" className={clsx("thead", theadClassName)} style={{ ...theadStyle }}>
          <div className={clsx("lg:container-fluid", containerFluidClassName)}>
            <div className="tr">{_getHeaders}</div>
          </div>
        </div>
        {ButtonBelowHeader ? <ButtonBelowHeader /> : <></>}
        {actionButton && actionButton()}
        <div data-testid="tableBody" className={clsx("tbody lg:container-fluid", containerFluidClassName)}>
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
