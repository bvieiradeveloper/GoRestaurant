import { Component, createRef, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { bool } from 'yup';
import { FormHandles } from '@unform/core';

interface ModalEditFoodProps{
  setIsOpen: () => void;
  handleUpdateFood: (food: FoodData)=> void;
  isOpen: boolean;
  editingFood: FoodData;
}

interface FoodData{
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

export function ModalEditFood(props: ModalEditFoodProps){
  const { isOpen, editingFood, setIsOpen, handleUpdateFood } = props;
  const formRef = useRef<FormHandles | null>(null);

  async function handleSubmit(data: FoodData){
    handleUpdateFood(data);
    setIsOpen();
  };


    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" icon={undefined} />

          <Input name="name" placeholder="Ex: Moda Italiana" icon={undefined} />
          <Input name="price" placeholder="Ex: 19.90" icon={undefined} />

          <Input name="description" placeholder="Descrição" icon={undefined} />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
};
