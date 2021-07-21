import React from "react";
import PropTypes from "prop-types";
import { Pane } from "neetoui";

export default function FormPane({ showPane, setShowPane, Form, title }) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title={title} isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <Form onClose={onClose} />
      </div>
    </Pane>
  );
}

FormPane.propTypes = {
  showPane: PropTypes.bool,
  setShowPane: PropTypes.func,
  Form: PropTypes.elementType,
  title: PropTypes.string,
};
