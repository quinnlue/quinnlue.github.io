// Determine the correct path to sidebar.html based on current location
function getSidebarPath() {
    const currentPath = window.location.pathname;
    // If we're in /posts/ subdirectory, go up one level
    if (currentPath.includes('/posts/')) {
        return '../sidebar.html';
    }
    // Otherwise we're at root
    return 'sidebar.html';
}

// Load and inject the sidebar
async function loadSidebar() {
    try {
        const sidebarPath = getSidebarPath();
        const response = await fetch(sidebarPath);
        const sidebarHTML = await response.text();
        
        // Find the layout container and insert sidebar at the beginning
        const layoutContainer = document.querySelector('.layout');
        if (layoutContainer) {
            layoutContainer.insertAdjacentHTML('afterbegin', sidebarHTML);
            
            // Mark the current page as active
            const currentPath = window.location.pathname;
            const currentFile = currentPath.split('/').pop() || 'hello-world.html';
            
            // Find all sidebar links and check which one matches current page
            const sidebarLinks = document.querySelectorAll('.sidebar a.post-link');
            sidebarLinks.forEach(link => {
                const href = link.getAttribute('href');
                // Check if the link's href matches the current page
                if (href.includes(currentFile) || (currentFile === '' && href.includes('hello-world'))) {
                    link.closest('li').classList.add('active');
                } else {
                    link.closest('li').classList.remove('active');
                }
            });
        }
    } catch (error) {
        console.error('Error loading sidebar:', error);
    }
}

// Load sidebar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSidebar);
} else {
    loadSidebar();
}
