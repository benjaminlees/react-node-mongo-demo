import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import { UrlsContext } from '../context'
import './Form.css'
import { useContext } from 'react';

function Form() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();
  const {addToUrls} = useContext(UrlsContext)

  const onSubmit = async (data: { url: string }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/shorten-url`, data)
      addToUrls(response.data)
    } catch (e) {
      setError('singleErrorInput', {
        type: 'manual',
        message: 'Something went wrong',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ url: data?.url }))}>
      <label htmlFor="url">Enter an https:// URL:</label>
      <input className={errors?.url && 'input--error'} type="url" id="url" {...register('url', { required: true})} />
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