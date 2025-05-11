"use client";

import { getViewHeight } from "@/utils/viewUtils";
import React, { ComponentType } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";

interface IFlatListProps {
  height: number;
  width: number;
  itemCount: number;
  itemSize: number;
  Row: ComponentType<ListChildComponentProps<any>>;
  itemData: {
    items: any[];
    onClickAction?: (id: number) => void;
  };
}

const FlatList: React.FC<IFlatListProps> = ({
  height,
  width,
  itemCount,
  itemSize,
  Row,
  itemData,
}) => {
  return (
    <FixedSizeList
      height={height}
      width={width}
      itemCount={itemCount}
      itemSize={itemSize}
      itemData={itemData}
    >
      {Row}
    </FixedSizeList>
  );
};

export default FlatList;
