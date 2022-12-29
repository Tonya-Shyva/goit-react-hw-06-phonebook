import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { addNewContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';
import {
  FormInputStyled,
  FormStyled,
  FormLabelStyled,
  BtnStyled,
} from './ContactForm.styled';

export function ContactForm() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const id = nanoid();
  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleFormSubmit = e => {
    e.preventDefault();
    // console.log(e);
    const form = e.target;
    const contactName = e.target[0].value;
    const contactNumber = e.target[1].value;
    const contactsLists = [...contacts];

    // console.log(...contacts);
    if (
      contactsLists.find(
        contact => contactName.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      toast.warn(`${contactName} is already in contacts. Enter another name`);
      e.target[0].value = '';
    } else if (
      contactsLists.find(contact => contactNumber === contact.number)
    ) {
      toast.warn(
        `${contactNumber} is already in contacts. Enter another number`
      );
      e.target[1].value = '';
    } else {
      dispatch(addNewContact({ id, name: contactName, number: contactNumber }));
      form.reset();
    }
  };

  return (
    <FormStyled onSubmit={handleFormSubmit}>
      <FormLabelStyled htmlFor={nameInputId}>Name</FormLabelStyled>
      <FormInputStyled
        id={nameInputId}
        type="text"
        name="name"
        placeholder="Enter name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <FormLabelStyled htmlFor={numberInputId}>Number</FormLabelStyled>
      <FormInputStyled
        id={numberInputId}
        type="tel"
        name="number"
        placeholder="Enter phone number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <BtnStyled type="submit">Add contact</BtnStyled>
    </FormStyled>
  );
}
