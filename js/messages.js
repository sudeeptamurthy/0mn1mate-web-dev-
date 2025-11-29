// Messages Viewer - Access stored notification messages
// Run this in the browser console to view messages

function getStoredMessages() {
  const messages = JSON.parse(localStorage.getItem('notifyMessages') || '[]');
  return messages;
}

function displayMessages() {
  const messages = getStoredMessages();
  
  if (messages.length === 0) {
    console.log('No messages stored yet.');
    return;
  }
  
  console.log(`\n📬 Total Messages: ${messages.length}\n`);
  console.log('='.repeat(60));
  
  messages.forEach((msg, index) => {
    console.log(`\nMessage ${index + 1}:`);
    console.log(`  Name: ${msg.name}`);
    console.log(`  Email: ${msg.email}`);
    console.log(`  Date: ${msg.date}`);
    console.log(`  Message: ${msg.message}`);
    console.log('-'.repeat(60));
  });
}

function exportMessages() {
  const messages = getStoredMessages();
  const dataStr = JSON.stringify(messages, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `notify-messages-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  console.log('Messages exported successfully!');
}

function clearMessages() {
  if (confirm('Are you sure you want to clear all stored messages?')) {
    localStorage.removeItem('notifyMessages');
    console.log('All messages cleared.');
  }
}

// Make functions available globally for console access
window.getNotifyMessages = getStoredMessages;
window.displayNotifyMessages = displayMessages;
window.exportNotifyMessages = exportMessages;
window.clearNotifyMessages = clearMessages;

console.log('📬 Messages Viewer loaded!');
console.log('Available commands:');
console.log('  - getNotifyMessages() - Get all messages as array');
console.log('  - displayNotifyMessages() - Display all messages in console');
console.log('  - exportNotifyMessages() - Download messages as JSON file');
console.log('  - clearNotifyMessages() - Clear all stored messages');

