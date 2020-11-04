import Modal from 'app/components/Modal';
import React, { memo } from 'react';
import Form from 'app/components/Form';
import Input from 'app/components/Input';
import Button from 'app/components/Button';

const CreateBoardModal = ({ onFinish, onCancel, form, loading, ...rest }) => {
  return (
    <>
      <Modal
        {...rest}
        title="Create Board"
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            form="create-form"
            key="submit"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form} id="create-form" onFinish={onFinish}>
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

export default memo(CreateBoardModal);
