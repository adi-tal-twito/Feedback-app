import React from 'react'
import { createContext, useState, useEffect} from 'react'


const FeedbackContext = createContext()

export const FeedbackProvider =({children}) => {
    const [isLoading,setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])

    //Holds the temporary feedback item that is edited
    const [feedbackEdit, setFeedbackEdit]= useState({
        item: {},
        edit: false, //false if not edited, true if it does
    })

    useEffect(() => {
        fetchFeedback()
    },[])

    //Fetch feedback
    const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&_order=desc`)
        const data = await response.json()
        
        setFeedback(data)
        setIsLoading(false)
    }

    //Add feedback
    const addFeedback= async (newFeedback) => {
        const response = await fetch('/feedback',
        { method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
         })

       // newFeedback.id= uuidv4()
        const data= await response.json()
        setFeedback([data, ...feedback])
    }




    //Delete feedback
    const deleteFeedback =async (id) => {
        if(window.confirm('Are you sure you want to delete?')){
           await fetch(`/feedback/${id}`, {method: 'DELETE'})
           
            setFeedback(feedback.filter((item)=> item.id !== id)) //deleting the item from the array
        }
        
    }

    // Update feedback item
    const updateFeedback= async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updItem)
        })
        
        const data = await response.json()
        
        setFeedback(
            feedback.map((item) => (item.id === id
         ? {...item, ...data} : item))
         )
    }

    //set item to be updated
    const editFeedback= (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }
    return <FeedbackContext.Provider
     value={{
        feedback,
        isLoading,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        
         //object of the item to be edit
        }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext
