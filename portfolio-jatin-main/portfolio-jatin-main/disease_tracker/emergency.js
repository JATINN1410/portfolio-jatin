document.addEventListener('DOMContentLoaded', function () {
    const findDoctorsButton = document.getElementById('findDoctorsButton');
    const chatSection = document.getElementById('chatSection');
    const onlineListContainer = document.getElementById('onlineList');
    const bestListContainer = document.getElementById('bestList');
    const messageInput = document.getElementById('messageInput');
    const sendMessageButton = document.getElementById('sendMessageButton');
    let selectedDoctor;

    findDoctorsButton.addEventListener('click', displayDoctorList);
    sendMessageButton.addEventListener('click', sendMessage);

    const staticDoctorList = [
        { name: 'Dr. Smith', specialty: 'Cardiologist', online: true, best: false },
        { name: 'Dr. Johnson', specialty: 'Pediatrician', online: true, best: false },
        // Add more doctors as needed
        { name: 'Dr. Sunny', specialty: 'ENT', online: true, best: false },
        { name: 'Dr. kishan', specialty: 'dentist', online: true, best: false },
        // Add more doctors as needed
        { name: 'Dr. harshvardhan', specialty: 'opthamalogist', online: true, best: false },
        { name: 'Dr. hammad', specialty: 'sexologist', online: true, best: false },
        { name: 'Dr. Mitchell', specialty: 'Endocrinologist', online: false, best: true },
            { name: 'Dr. Turner', specialty: 'Gastroenterologist', online: true, best: true },
            { name: 'Dr. Foster', specialty: 'Urologist', online: false, best: true },
            { name: 'Dr. Rodriguez', specialty: 'Dermatologist', online: false, best: true },
            { name: 'Dr. Patel', specialty: 'Neurologist', online: false, best: true },
            // Add more doctors as needed
        // Add more doctors as needed
        // const staticDoctorList = [
        //     { name: 'Dr. Smith', specialty: 'Cardiologist', online: true, best: false },
        //     { name: 'Dr. Johnson', specialty: 'Pediatrician', online: true, best: false },
        //     { name: 'Dr. Sunny', specialty: 'ENT', online: true, best: false },
        //     { name: 'Dr. Kishan', specialty: 'Dentist', online: true, best: false },
        //     { name: 'Dr. Harshvardhan', specialty: 'Ophthalmologist', online: true, best: false },
        //     { name: 'Dr. Hammad', specialty: 'Sexologist', online: true, best: false },
        //     // Add more doctors as needed
        //     { name: 'Dr. Mitchell', specialty: 'Endocrinologist', online: false, best: true },
        //     { name: 'Dr. Turner', specialty: 'Gastroenterologist', online: true, best: true },
        //     { name: 'Dr. Foster', specialty: 'Urologist', online: false, best: true },
        //     { name: 'Dr. Rodriguez', specialty: 'Dermatologist', online: false, best: true },
        //     { name: 'Dr. Patel', specialty: 'Neurologist', online: false, best: true },
        //     // Add more doctors as needed
        // ];
        
    ];

    function displayDoctorList() {
        const doctorListContainer = document.getElementById('doctorList');
        const onlineDoctorsContainer = document.getElementById('onlineDoctors');
        const bestDoctorsContainer = document.getElementById('bestDoctors');

        // Clear previous content
        onlineListContainer.innerHTML = '';
        bestListContainer.innerHTML = '';

        const onlineDoctors = staticDoctorList.filter(doctor => doctor.online);
        const bestDoctors = staticDoctorList.filter(doctor => doctor.best);

        if (onlineDoctors.length === 0 && bestDoctors.length === 0) {
            onlineListContainer.innerHTML = '<p>No doctors available at the moment. Please try again later.</p>';
            bestListContainer.innerHTML = '<p>No best doctors available at the moment. Please try again later.</p>';
        } else {
            doctorListContainer.classList.remove('hidden');
            if (onlineDoctors.length > 0) {
                createDoctorList(onlineListContainer, onlineDoctors, true);
            }
            if (bestDoctors.length > 0) {
                createDoctorList(bestListContainer, bestDoctors, false);
            }
        }
    }

    function createDoctorList(container, doctors, enableChat) {
        const list = document.createElement('ul');
        doctors.forEach(doctor => {
            const listItem = document.createElement('li');
            const chatButton = document.createElement('button');
            chatButton.textContent = 'Chat';
            chatButton.classList.add('chat-button');
            if (enableChat) {
                chatButton.addEventListener('click', () => startChat(doctor));
            } else {
                chatButton.disabled = true;
            }
            listItem.textContent = `${doctor.name} - ${doctor.specialty} `;
            listItem.appendChild(chatButton);
            list.appendChild(listItem);
        });
        container.appendChild(list);
    }

    function startChat(doctor) {
        selectedDoctor = doctor;
        chatSection.classList.remove('hidden');
        updateChatHeader(doctor);
        loadChatHistory(doctor);
    }

    function updateChatHeader(doctor) {
        const chatSectionHeader = document.getElementById('chatSection').getElementsByTagName('h2')[0];
        chatSectionHeader.textContent = `Chat with Dr. ${doctor.name}`;
    }

    function loadChatHistory(doctor) {
        const chatMessagesContainer = document.getElementById('chatMessages');
        const chatHistory = getChatHistory(doctor);
        chatMessagesContainer.innerHTML = '';

        chatHistory.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatMessagesContainer.appendChild(messageElement);
        });
    }

    function getChatHistory(doctor) {
        const localStorageKey = `chat_history_${doctor.name}`;
        const storedHistory = localStorage.getItem(localStorageKey);
        return storedHistory ? JSON.parse(storedHistory) : [];
    }

    function saveMessageToChatHistory(doctor, message) {
        const localStorageKey = `chat_history_${doctor.name}`;
        const chatHistory = getChatHistory(doctor);
        chatHistory.push(message);
        localStorage.setItem(localStorageKey, JSON.stringify(chatHistory));
    }

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message !== '') {
            const chatMessagesContainer = document.getElementById('chatMessages');
            const messageElement = document.createElement('div');
            messageElement.textContent = `You: ${message}`;
            chatMessagesContainer.appendChild(messageElement);

            saveMessageToChatHistory(selectedDoctor, `You: ${message}`);
            // Simulate doctor's response after a delay
            setTimeout(() => {
                const doctorMessage = `Dr. ${selectedDoctor.name}: Hi! How can I help you?`;
                const doctorMessageElement = document.createElement('div');
                doctorMessageElement.textContent = doctorMessage;
                chatMessagesContainer.appendChild(doctorMessageElement);
                saveMessageToChatHistory(selectedDoctor, doctorMessage);
            }, 1000);

            // Clear the input field
            messageInput.value = '';
        }
    }
});