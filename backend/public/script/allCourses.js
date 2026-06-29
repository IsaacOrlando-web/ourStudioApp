let currentCategory = 'all';
        let allCourses = document.querySelectorAll('.course-card');
        
        // Actualizar contadores
        function updateCounters() {
            const visibleCourses = document.querySelectorAll('.course-card:not([style*="display: none"])');
            const totalCourses = allCourses.length;
            document.getElementById('visibleCount').innerText = visibleCourses.length;
            document.getElementById('totalCount').innerText = totalCourses;
        }
        
        // Función principal de filtrado
        function filterCourses() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
            
            allCourses.forEach(card => {
                const title = card.getAttribute('data-title');
                const author = card.getAttribute('data-author');
                const description = card.getAttribute('data-description');
                const category = card.getAttribute('data-category');
                
                // Verificar categoría
                const categoryMatch = currentCategory === 'all' || category === currentCategory;
                
                // Verificar búsqueda
                const searchMatch = searchTerm === '' || 
                    title.includes(searchTerm) || 
                    author.includes(searchTerm) || 
                    description.includes(searchTerm);
                
                if (categoryMatch && searchMatch) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
            
            updateCounters();
            
            // Mostrar mensaje si no hay resultados
            const visibleCourses = document.querySelectorAll('.course-card:not([style*="display: none"])');
            const coursesGrid = document.getElementById('coursesGrid');
            let emptyMessage = document.getElementById('noResultsMessage');
            
            if (visibleCourses.length === 0) {
                if (!emptyMessage) {
                    emptyMessage = document.createElement('div');
                    emptyMessage.id = 'noResultsMessage';
                    emptyMessage.className = 'empty-state';
                    emptyMessage.innerHTML = `
                        <i class="fas fa-search"></i>
                        <h3>No se encontraron cursos</h3>
                        <p>Intenta con otros términos de búsqueda o categoría</p>
                        <button onclick="resetFilters()" class="explore-btn" style="background: #adc178; border: none; cursor: pointer;">
                            <i class="fas fa-undo-alt"></i> Limpiar filtros
                        </button>
                    `;
                    coursesGrid.appendChild(emptyMessage);
                }
            } else if (emptyMessage) {
                emptyMessage.remove();
            }
        }
        
        // Filtrar por categoría
        function filterByCategory(category) {
            currentCategory = category;
            
            // Actualizar botones activos
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-category') === category) {
                    btn.classList.add('active');
                }
            });
            
            filterCourses();
        }
        
        // Reiniciar filtros
        function resetFilters() {
            document.getElementById('searchInput').value = '';
            currentCategory = 'all';
            
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-category') === 'all') {
                    btn.classList.add('active');
                }
            });
            
            filterCourses();
        }
        
        // Ver detalle del curso (función que tú implementarás)
        function viewCourseDetail(courseId) {
            // Aquí puedes implementar la redirección a la página de detalle
            // Ejemplo: window.location.href = `/cursos/${courseId}`;
            console.log('Ver detalle del curso:', courseId);
            alert(`Redirigiendo al detalle del curso: ${courseId}\nImplementa aquí tu lógica de navegación`);
            // window.location.href = `/cursos/${courseId}`;
        }
        
        // Inicializar contadores al cargar
        document.addEventListener('DOMContentLoaded', function() {
            updateCounters();
        });
        
        // Debounce para mejorar rendimiento en búsqueda
        let searchTimeout;
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keyup', function() {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(filterCourses, 300);
            });
        }