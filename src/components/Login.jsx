import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      localStorage.setItem('userName', name)
      navigate('/questions')
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-2 sm:px-4 relative overflow-hidden">
      {/* Animated background particles */}
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

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative mx-2 sm:mx-0"
      >
        {/* Glow effects */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 animate-glow"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 animate-glow-delay"></div>

        {/* Card content */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative backdrop-blur-xl bg-black/50 rounded-3xl p-4 sm:p-8 shadow-[0_8px_40px_rgb(0,0,0,0.12)] border border-white/20"
        >
          {/* Logo animation */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 sm:w-28 sm:h-28 mx-auto relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl transform rotate-6"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl transform -rotate-6"></div>
            <div className="relative bg-[#0F172A] rounded-2xl w-full h-full flex items-center justify-center">
              <motion.svg 
                whileHover={{ scale: 1.2 }}
                className="w-16 h-16 text-white"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </motion.svg>
            </div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 sm:mt-8 text-center text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Prompts Taker
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-2 sm:mt-3 text-center text-gray-300 text-base sm:text-lg px-2"
          >
            Give us your prompts and so we can check Accuracy of our AI Model more efficiently
          </motion.p>

          <motion.form 
            onSubmit={handleSubmit} 
            className="mt-6 sm:mt-8 space-y-4 sm:space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="relative group">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-5 pr-12 py-4 bg-white/5 border-2 border-white/10 rounded-xl 
                          text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                          focus:ring-cyan-500 focus:border-transparent transition-all duration-300
                          group-hover:bg-white/10 h-14"
                placeholder="Enter your name"
                required
              />
              <motion.div 
                className="absolute right-4 top-[50%] -translate-y-[50%] pointer-events-none"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 text-lg font-medium rounded-xl
                        text-white overflow-hidden transition-all duration-300
                        bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600
                        shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 
                              bg-white opacity-10 rotate-12 group-hover:-translate-x-96 ease-in-out"></span>
              <span className="relative flex items-center gap-2">
                Begin Journey
                <svg className="w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login