import './Form.css'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import axios from 'axios';

function Form() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data: any) => {
    try {
      await axios.post('http://localhost:3000/shorten-url', data)
    } catch (e) {
      setError('singleErrorInput', {
        type: 'manual',
        message: 'Something went wrong',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <label htmlFor="url">Enter an https:// URL:</label>
      <input className={errors?.url && 'error'} type="url" id="url" {...register('url', { required: true})} />
      <button type="submit">Shorten URL</button>
      <ErrorMessage
        errors={errors}
        name="singleErrorInput"
        render={({ message }) => <p>{message}</p>}
      />
    </form>
  )
}

export default Form