import React from "react";

interface IInfiniteScroll {
  children: any;
  pagination: any;
  onChangePagination: any;
  isLoading: any;
  bottomOffset?: any;
  className?: any;
}

const InfiniteScroll = ({ children, pagination, onChangePagination, isLoading, bottomOffset = 100, className }: IInfiniteScroll) => {
  const onPageChange = () => {
    const nextPage = (pagination?.pageNumber ?? 0) + 1;
    if (pagination?.pageCount >= nextPage) {
      pagination.page = nextPage;
      onChangePagination(pagination);
    }
  };

  React.useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (!isLoading && scrollTop + clientHeight >= scrollHeight - bottomOffset) {
        onPageChange();
      }
    };

    window.addEventListener("scroll", onScroll, true);

    return () => {
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [pagination, isLoading]);

  return <div className={className}>{children}</div>;
};

export default InfiniteScroll;
