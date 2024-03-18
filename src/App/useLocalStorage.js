// Hook to abstract local storage interactions and provide loading and error states.
import { useState, useEffect } from 'react';
function useLocalStorage(itemName, initialValue){
  const [item, setItem] = useState(initialValue)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  
  // Effect to perform local storage actions with delay and error handling.
  useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName)
  
        let parsedItem;
  
        if(!localStorageItem){
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
          setItem(parsedItem)
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(error)
      }
    }, 2000)
  }, [])
  

  // Function to save the item back to local storage and update the state.
  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem))
    setItem(newItem)
  }
  return {
    item, 
    saveItem, 
    loading, 
    error}
}

export {useLocalStorage};