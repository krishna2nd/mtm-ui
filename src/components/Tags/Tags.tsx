import React, { useState, useEffect } from "react";
import { Routes, IRouteComponent } from "../../models/App";
import { connect } from "react-redux";
import { IState } from "../../reducers/Root";
import TagPanel from "./TagPanel";
import { TagsState } from "../../reducers/Tags";
import { ITagItem, TagItem } from "../../models/Tags";
import MTMList, { PartialColumn } from "../Presentational/MTMList";

const columns: PartialColumn[] = [
  {
    name: "Name",
    fieldName: "name"
  },
  {
    name: "Firing Triggers",
    onRender: (item: ITagItem) => item.triggers.join(", ")
  },
  {
    name: "Body",
    fieldName: "body"
  }
];

const mapStateToProps = (state: IState) => state.tags;

interface ITagsProps extends TagsState {}

const Tags: React.FC<ITagsProps> = (props: ITagsProps) => {
  const [items, setItems] = useState([] as ITagItem[]);

  useEffect(() => {
    fetch("https://ms-tagmanager.azurewebsites.net/tags")
      .then(response => response.json())
      .then(
        response => setItems(response.map((item: object) => new TagItem(item))),
        error => console.error(error)
      );
  }, []);

  return (
    <>
      <MTMList items={items} columns={columns} />
      {props.isTagPanelOpen && <TagPanel {...props.panelData} />}
    </>
  );
};

export default {
  name: "Tags",
  component: connect(mapStateToProps)(Tags),
  icon: "Tag",
  key: Routes.Tags
} as IRouteComponent;
