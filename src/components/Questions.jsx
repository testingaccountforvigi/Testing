import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function Questions() {
  const [questions, setQuestions] = useState([''])
  const navigate = useNavigate()
  const userName = localStorage.getItem('userName')
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  useEffect(() => {
    if (!userName) {
      navigate('/')
    }
  }, [userName, navigate])

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions]
    newQuestions[index] = value
    setQuestions(newQuestions)
  }

  const addQuestion = () => {
    setQuestions([...questions, ''])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const filteredQuestions = questions.filter(q => q.trim())
    
    if (filteredQuestions.length > 0) {
      try {
        console.log('Starting submission...')
        
        const questionRows = filteredQuestions.map(question => ({
          user_name: userName,
          question: question
        }))
        
        console.log('Sending to Supabase:', questionRows)
        
        const { data, error } = await supabase
          .from('questions')
          .insert(questionRows)
        
        if (error) {
          console.error('Supabase error:', error)
          throw error
        }
        
        console.log('Successfully saved to Supabase')
        
        setShowSuccessModal(true)
        console.log('Modal state set to:', true)
        
        setTimeout(() => {
          setShowSuccessModal(false)
          navigate('/')
        }, 6000)
        
      } catch (error) {
        console.error('Error inserting questions:', error)
        alert(`Failed to save questions: ${error.message || 'Unknown error'}`)
      }
    } else {
      alert('Please enter at least one question before saving.')
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A] py-6 sm:py-12 px-2 sm:px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
              x: ['0%', '100%'],
              y: ['0%', '100%'],
            }}
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%` 
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto relative"
      >
        {/* Glow effects */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 animate-glow"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 animate-glow-delay"></div>

        <motion.div 
          className="relative backdrop-blur-xl bg-black/50 rounded-3xl p-4 sm:p-8 shadow-[0_8px_40px_rgb(0,0,0,0.12)] border border-white/20"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 pb-4 border-b border-white/10">
            <div>
              <motion.h2 
                className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              >
                Welcome, {userName}!
              </motion.h2>
              <motion.p 
                className="mt-2 text-gray-300 text-base sm:text-lg font-semibold tracking-wide"
              >
                Enter Your Prompts Below
              </motion.p>
            </div>
            
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-75 group-hover:opacity-100"></div>
              <div className="relative h-12 w-12 bg-[#0F172A] rounded-xl flex items-center justify-center">
                <motion.svg 
                  className="w-6 h-6 text-cyan-400"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </motion.svg>
              </div>
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <AnimatePresence>
              {questions.map((question, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                >
                  <textarea
                    value={question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                    className="w-full p-3 sm:p-4 bg-white/5 border-2 border-white/10 rounded-xl text-white
                              focus:ring-2 focus:ring-cyan-500 focus:border-transparent 
                              transition-all duration-300 resize-none group-hover:bg-white/10
                              h-24 sm:h-32 placeholder-gray-500 text-sm sm:text-base"
                    placeholder="Type your question here..."
                    rows="3"
                  />
                  <div className="absolute -top-3 left-4 px-3 py-1 rounded-full bg-gradient-to-r 
                                from-cyan-500/80 to-blue-500/80 backdrop-blur-md
                                text-sm font-medium text-white flex items-center gap-2 border border-white/10
                                shadow-lg">
                    <motion.span 
                      className="flex items-center justify-center w-5 h-5 rounded-full 
                                bg-white/10 backdrop-blur-sm text-white text-xs"
                      whileHover={{ scale: 1.2 }}
                    >
                      {index + 1}
                    </motion.span>
                    <span className="text-white/90">Prompt</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
              <motion.button
                type="button"
                onClick={addQuestion}
                className="py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-white font-medium relative overflow-hidden
                          bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600
                          shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]
                          flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <motion.span 
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </motion.span>
                Add Prompt
              </motion.button>

              <motion.button
                type="submit"
                className="py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-white font-medium relative overflow-hidden
                          bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
                          shadow-[0_0_20px_rgba(255,0,255,0.3)] hover:shadow-[0_0_25px_rgba(255,0,255,0.5)]
                          flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 
                                bg-white opacity-10 rotate-12 group-hover:-translate-x-96 ease-in-out"></span>
                <motion.svg 
                  className="w-5 h-5"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </motion.svg>
                Save Prompts
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4 backdrop-blur-sm">
            <motion.div className="relative max-w-md w-full mx-2 sm:mx-0">
              {/* Glow effects */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-75"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-lg opacity-75"></div>
              
              <div className="relative bg-black/80 border border-white/20 rounded-2xl p-4 sm:p-8">
                <div className="flex flex-col items-center text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center"
                  >
                    <svg 
                      className="w-8 h-8 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                  >
                    Thank You!
                  </motion.h3>
                  
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300"
                  >
                    Your prompts have been saved successfully. Your contribution means a lot to us! 🙏
                  </motion.p>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.5 }}
                    className="w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  >
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Questions 