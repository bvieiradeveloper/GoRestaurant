import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Food } from '../../components/Food';
import {Header} from '../../components/Header';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';


interface FoodData{
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

export function Dashboard(){
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     foods: [],
  //     editingFood: {},
  //     modalOpen: false,
  //     editModalOpen: false,
  //   }
  
  //const { modalOpen, editModalOpen, editingFood, foods } = this.state;

  const [foods, setFoods] = useState<FoodData[]>([]);
  const [modalOpen, setModelOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editingFood, setEditingFood] = useState<FoodData>({} as FoodData);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const response = await api.get<FoodData[]>('/foods');
      setFoods(response.data );  
    }
    fetchData().catch(console.error);
  }, [])
  
  async function handleAddFood(food : FoodData) {

    try {
      const fetchData = async () => {
        const response = await api.post('/foods', {
          ...food,
          available: true,
        });
     
        let data = response.data as FoodData;
        const newFoods = [...foods, data];
        setFoods(newFoods);
      }
      await fetchData();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: FoodData){
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function  handleDeleteFood(id: number){

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  function toggleModal(){
    setModelOpen(!modalOpen);
  }

  function toggleEditModal(){
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: FoodData){
     
    setEditingFood(food);
    setEditModalOpen(true);
  }
    return (
      
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
};

export default Dashboard;
