'use client'

import { useState } from 'react'
import { FiMenu, FiSearch, FiSend, FiDollarSign, FiRefreshCw } from 'react-icons/fi'
import { SiTon } from 'react-icons/si'

export default function TONSocialChat() {
  const [activeChat, setActiveChat] = useState('Alice')
  const [message, setMessage] = useState('')
  const [showWallet, setShowWallet] = useState(false)
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')

  const chats = [
    { name: 'Alice', lastMessage: 'Hey, how are you?', time: '10:00 AM' },
    { name: 'Bob', lastMessage: 'Can you send me 5 TON?', time: '9:45 AM' },
    { name: 'Charlie', lastMessage: 'Meeting at 3 PM', time: 'Yesterday' },
  ]

  const messages = [
    { sender: 'Alice', content: 'Hey, how are you?', time: '10:00 AM' },
    { sender: 'You', content: "I'm good, thanks! How about you?", time: '10:02 AM' },
    { sender: 'Alice', content: 'Can you send me 5 TON?', time: '10:05 AM' },
    { sender: 'You', content: "Sure, I'll send it right away.", time: '10:07 AM' },
  ]

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Here you would typically send the message to a backend
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  const handleTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    if (amount && recipient) {
      // Here you would typically process the transaction
      console.log(`Sending ${amount} TON to ${recipient}`)
      setAmount('')
      setRecipient('')
      setShowWallet(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200">
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">TON Social</h1>
          <button className="text-gray-500 hover:text-gray-700">
            <FiMenu size={24} />
          </button>
        </div>
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search chats"
              className="w-full p-2 pl-10 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-140px)]">
          {chats.map((chat) => (
            <div
              key={chat.name}
              className={`p-4 flex items-center cursor-pointer ${
                activeChat === chat.name ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => setActiveChat(chat.name)}
            >
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                {chat.name[0]}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{chat.name}</h3>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
              <span className="text-xs text-gray-400">{chat.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-gray-200 bg-white">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
              {activeChat[0]}
            </div>
            <h2 className="text-xl font-semibold">{activeChat}</h2>
          </div>
          <div className="flex space-x-4">
            <button className="text-blue-500 hover:text-blue-700" onClick={() => setShowWallet(true)}>
              <SiTon size={24} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <FiSearch size={24} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-white'
                }`}
              >
                <p>{msg.content}</p>
                <span className="text-xs opacity-75 mt-1 block">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200 flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="ml-2 text-blue-500 hover:text-blue-700">
            <FiSend size={24} />
          </button>
        </form>
      </div>

      {/* TON Wallet Modal */}
      {showWallet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <SiTon className="mr-2 text-blue-500" /> TON Wallet
            </h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Balance</h3>
              <p className="text-3xl font-bold text-blue-600">100 TON</p>
            </div>
            <form onSubmit={handleTransaction} className="space-y-4">
              <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
                  Recipient Address
                </label>
                <input
                  type="text"
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount (TON)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                >
                  <FiDollarSign className="mr-2" /> Send TON
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-md hover:bg-gray-300 transition duration-300 flex items-center justify-center"
                  onClick={() => setShowWallet(false)}
                >
                  <FiRefreshCw className="mr-2" /> Exchange
                </button>
              </div>
            </form>
            <button
              className="mt-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowWallet(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

