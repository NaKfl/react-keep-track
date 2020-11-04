import Modal from 'app/components/Modal';
import React, { memo } from 'react';
import Form from 'app/components/Form';
import Input from 'app/components/Input';
import Button from 'app/components/Button';

const EditCardModel = ({ editedCard, onFinish, onCancel, form, ...rest }) => {
  return (
    <>
      <Modal
        {...rest}
        title="Edit Card"
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
            // loading={}
          >
            Save
          </Button>,
        ]}
      >
        <Form
          form={form}
          id="create-form"
          onFinish={onFinish}
          initialValues={{ content: editedCard ? editedCard.content : '' }}
        >
          <Form.Item
            label="Content"
            name="content"
            rules={[
              {
                required: true,
                message: "Please input card's content",
              },
            ]}
          >
            <Input placeholder="Input content of card" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default memo(EditCardModel);
