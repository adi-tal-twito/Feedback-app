import React from 'react'
import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider =({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id:1,
            text: 'This item is from context',
            rating: 10
        },
        {
            id:2,
            text: 'This item is from context',
            rating: 7
        },
        {
            id:3,
            text: 'This item is from context',
            rating: 5
        }
    ])

    //Holds the temporary feedback item that is edited
    const [feedbackEdit, setFeedbackEdit]= useState({
        item: {},
        edit: false, //false if not edited, true if it does
    })

    //Add feedback
    const addFeedback=(newFeedback) => {
        newFeedback.id= uuidv4()
        setFeedback([newFeedback,...feedback])

    }

    //Delete feedback
    const deleteFeedback =(id) => {
        if(window.confirm('Are you sure you want to delete?')){
           setFeedback(feedback.filter((item)=> item.id !== id)) //deleting the item from the array
        }
        
    }

    // Update feedback item
    const updateFeedback= (id, updItem) => {
        setFeedback(
            feedback.map((item) => (item.id === id
         ? {...item, ...updItem} : item))
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
        deleteFeedback,
        feedbackEdit,
        addFeedback,
        editFeedback,
        updateFeedback,
         //object of the item to be edit
        }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext
