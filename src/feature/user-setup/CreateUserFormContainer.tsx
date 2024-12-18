'use client';

import CreateUserForm from './components/CreateUserForm';
import { useCreateUserForm } from './hooks/useCreateUserForm';

const CreateUserFormContainer = () => {
  const { form, control, fields, append, remove, uploading, onSubmit } = useCreateUserForm();
  return (
    <div className="mt-10">
      <CreateUserForm
        append={append}
        control={control}
        fields={fields}
        form={form}
        onSubmit={onSubmit}
        remove={remove}
        uploading={uploading}
      />
    </div>
  );
};

export default CreateUserFormContainer;
