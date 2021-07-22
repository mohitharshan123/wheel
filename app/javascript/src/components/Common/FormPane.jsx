import React from "react";
import PropTypes from "prop-types";
import { Pane } from "neetoui";

export default function FormPane({
  showPane,
  setShowPane,
  Form,
  title,
  itemData = null,
}) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title={title} isOpen={showPane} onClose={onClose}>
      <div className="pl-6 pr-12">
        <Form onClose={onClose} itemData={itemData} />
      </div>
    </Pane>
  );
}

FormPane.propTypes = {
  showPane: PropTypes.bool,
  setShowPane: PropTypes.func,
  Form: PropTypes.elementType,
  title: PropTypes.string,
  itemData: PropTypes.object,
};
