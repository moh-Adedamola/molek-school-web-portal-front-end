// File: src/pages/parent/ParentCommunication.jsx
import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, User, Calendar, BookOpen, Bell, Phone, Mail, Search, Filter } from 'lucide-react';

const ParentCommunication = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [messageType, setMessageType] = useState('general');
  const [loading, setLoading] = useState(true);

  const recipients = [
    { id: 'class-teacher', name: 'Mrs. Okafor', role: 'Class Teacher - JSS 2A', subject: 'English Language' },
    { id: 'math-teacher', name: 'Mr. Adebayo', role: 'Mathematics Teacher', subject: 'Mathematics' },
    { id: 'principal', name: 'Dr. Akinwale', role: 'School Principal', subject: 'Administration' },
    { id: 'admin', name: 'School Administration', role: 'General Administration', subject: 'General Inquiries' }
  ];

  const messageTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'academic', label: 'Academic Concern' },
    { value: 'attendance', label: 'Attendance Issue' },
    { value: 'behavior', label: 'Behavioral Discussion' },
    { value: 'meeting', label: 'Meeting Request' }
  ];

  useEffect(() => {
    // Mock conversation data
    const mockMessages = [
      {
        id: 1,
        from: 'Mrs. Okafor',
        to: 'Parent',
        subject: 'Adunni\'s Progress Update',
        message: 'Good afternoon. I wanted to update you on Adunni\'s recent improvement in English Language. She has shown remarkable progress in her essay writing and class participation.',
        timestamp: '2025-02-15T14:30:00',
        type: 'academic',
        isRead: true,
        isFromParent: false
      },
      {
        id: 2,
        from: 'Parent',
        to: 'Mrs. Okafor',
        subject: 'Re: Adunni\'s Progress Update',
        message: 'Thank you for the update, Mrs. Okafor. We are very pleased to hear about her improvement. Is there anything specific we can do at home to continue supporting her progress?',
        timestamp: '2025-02-15T19:45:00',
        type: 'academic',
        isRead: true,
        isFromParent: true
      },
      {
        id: 3,
        from: 'Mr. Adebayo',
        to: 'Parent',
        subject: 'Mathematics Assignment Reminder',
        message: 'Please remind Adunni about the Mathematics project due next Friday. She may need some extra support with the geometry section.',
        timestamp: '2025-02-14T10:15:00',
        type: 'academic',
        isRead: false,
        isFromParent: false
      }
    ];

    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedRecipient) return;

    const recipient = recipients.find(r => r.id === selectedRecipient);
    const message = {
      id: Date.now(),
      from: 'Parent',
      to: recipient.name,
      subject: `${messageTypes.find(t => t.value === messageType)?.label} - New Message`,
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: messageType,
      isRead: true,
      isFromParent: true
    };

    setMessages([message, ...messages]);
    setNewMessage('');
    setSelectedRecipient('');
    setMessageType('general');
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB') + ' at ' + date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case 'academic': return <BookOpen className="w-4 h-4" />;
      case 'attendance': return <Calendar className="w-4 h-4" />;
      case 'behavior': return <User className="w-4 h-4" />;
      case 'meeting': return <Phone className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 p-4">
        <div className="container-max">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <div className="container-max">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Communication</h1>
          <p className="text-neutral-600">Stay connected with your children's teachers and school administration</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Message Composition */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border border-neutral-200 mb-6">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Send New Message</h3>
              
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Send to
                  </label>
                  <select
                    value={selectedRecipient}
                    onChange={(e) => setSelectedRecipient(e.target.value)}
                    className="input-base w-full"
                    required
                  >
                    <option value="">Select recipient...</option>
                    {recipients.map(recipient => (
                      <option key={recipient.id} value={recipient.id}>
                        {recipient.name} - {recipient.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Message Type
                  </label>
                  <select
                    value={messageType}
                    onChange={(e) => setMessageType(e.target.value)}
                    className="input-base w-full"
                  >
                    {messageTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    rows={6}
                    className="input-base w-full resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3 rounded-lg"
                  disabled={!newMessage.trim() || !selectedRecipient}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Quick Contacts */}
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Quick Contacts</h3>
              
              <div className="space-y-3">
                {recipients.map(recipient => (
                  <div key={recipient.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-neutral-800 text-sm">{recipient.name}</h4>
                      <p className="text-xs text-neutral-600">{recipient.role}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedRecipient(recipient.id)}
                        className="p-1 text-primary-600 hover:bg-primary-50 rounded"
                        title="Send Message"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-neutral-200">
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-neutral-800">Message History</h3>
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-neutral-400" />
                    <input 
                      type="text" 
                      placeholder="Search messages..." 
                      className="input-base text-sm w-48"
                    />
                  </div>
                </div>
              </div>

              <div className="max-h-[600px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                    <p className="text-neutral-600">No messages yet. Start a conversation with your child's teachers!</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`p-4 border-l-4 ${
                          message.isFromParent 
                            ? 'bg-primary-50 border-primary-500 ml-8' 
                            : 'bg-neutral-50 border-secondary-500 mr-8'
                        } ${!message.isRead && !message.isFromParent ? 'bg-accent-50' : ''}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`p-1 rounded-full ${
                              message.isFromParent ? 'bg-primary-100' : 'bg-secondary-100'
                            }`}>
                              <User className={`w-3 h-3 ${
                                message.isFromParent ? 'text-primary-600' : 'text-secondary-600'
                              }`} />
                            </div>
                            <span className="font-medium text-sm text-neutral-800">
                              {message.isFromParent ? 'You' : message.from}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                              message.type === 'academic' ? 'bg-blue-100 text-blue-800' :
                              message.type === 'attendance' ? 'bg-yellow-100 text-yellow-800' :
                              message.type === 'behavior' ? 'bg-purple-100 text-purple-800' :
                              message.type === 'meeting' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {getMessageIcon(message.type)}
                              {messageTypes.find(t => t.value === message.type)?.label}
                            </span>
                          </div>
                          {!message.isRead && !message.isFromParent && (
                            <Bell className="w-4 h-4 text-accent-600" />
                          )}
                        </div>

                        <h4 className="font-medium text-neutral-800 mb-2">{message.subject}</h4>
                        <p className="text-neutral-700 text-sm mb-3 leading-relaxed">{message.message}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-neutral-500">
                            {formatTimestamp(message.timestamp)}
                          </span>
                          {!message.isFromParent && (
                            <button className="text-primary-600 text-xs font-medium hover:text-primary-700">
                              Reply
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Communication Guidelines */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mt-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Communication Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                <div>
                  <h4 className="font-medium mb-2">Response Times</h4>
                  <ul className="space-y-1">
                    <li>• Teachers: Within 24-48 hours</li>
                    <li>• Administration: Within 2-3 business days</li>
                    <li>• Urgent matters: Call school directly</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Best Practices</h4>
                  <ul className="space-y-1">
                    <li>• Be specific about concerns</li>
                    <li>• Include relevant dates/incidents</li>
                    <li>• Maintain respectful tone</li>
                    <li>• Follow up if needed</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Emergency Contact:</strong> For urgent matters requiring immediate attention, 
                  please call the school office at <span className="font-mono">+234-801-234-5678</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentCommunication;