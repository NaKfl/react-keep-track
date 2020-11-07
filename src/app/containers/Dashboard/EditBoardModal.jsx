import Modal from 'app/components/Modal';
import React, { memo } from 'react';
import Form from 'app/components/Form';
import Input from 'app/components/Input';
import Button from 'app/components/Button';

const EditBoardModal = ({
  onFinish,
  editedBoard,
  onCancel,
  form,
  loading,
  ...rest
}) => {
  return (
    <>
      <Modal
        {...rest}
        title="Edit Board"
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            form="edit-form"
            key="submit"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Save
          </Button>,
        ]}
      >
        <Form
          form={form}
          id="edit-form"
          onFinish={onFinish}
          initialValues={{ name: editedBoard ? editedBoard.name : '' }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input board's name",
              },
            ]}
          >
            <Input placeholder="Input name of board" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default memo(EditBoardModal);
