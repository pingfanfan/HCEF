// Model data based on HCEF-LLM framework
const modelData = [
    {
        rank: 1,
        model: "GPT-4 Turbo",
        organization: "OpenAI",
        overallScore: 92.5,
        proficiencyLevel: "Expert",
        category: "gpt",
        scores: {
            cd1: 94, // Input Processing & Comprehension
            cd2: 93, // Knowledge Retention & Application
            cd3: 91, // Logical Reasoning & Problem Solving
            cd4: 89, // Imaginative & Creative Cognition
            cd5: 95, // Human-Centricity & Ethical Alignment
            cd6: 93  // Output Generation & Delivery
        }
    },
    {
        rank: 2,
        model: "Claude 3 Opus",
        organization: "Anthropic",
        overallScore: 91.2,
        proficiencyLevel: "Expert",
        category: "claude",
        scores: {
            cd1: 92,
            cd2: 90,
            cd3: 93,
            cd4: 88,
            cd5: 96,
            cd6: 91
        }
    },
    {
        rank: 3,
        model: "Gemini 2.5 Pro",
        organization: "Google",
        overallScore: 89.8,
        proficiencyLevel: "Proficient",
        category: "gemini",
        scores: {
            cd1: 91,
            cd2: 89,
            cd3: 90,
            cd4: 87,
            cd5: 92,
            cd6: 90
        }
    },
    {
        rank: 4,
        model: "GPT-4",
        organization: "OpenAI",
        overallScore: 88.7,
        proficiencyLevel: "Proficient",
        category: "gpt",
        scores: {
            cd1: 90,
            cd2: 91,
            cd3: 89,
            cd4: 85,
            cd5: 90,
            cd6: 87
        }
    },
    {
        rank: 5,
        model: "Claude 3 Sonnet",
        organization: "Anthropic",
        overallScore: 86.3,
        proficiencyLevel: "Proficient",
        category: "claude",
        scores: {
            cd1: 88,
            cd2: 85,
            cd3: 87,
            cd4: 84,
            cd5: 89,
            cd6: 85
        }
    },
    {
        rank: 6,
        model: "Gemini Pro",
        organization: "Google",
        overallScore: 84.1,
        proficiencyLevel: "Proficient",
        category: "gemini",
        scores: {
            cd1: 86,
            cd2: 83,
            cd3: 85,
            cd4: 82,
            cd5: 86,
            cd6: 83
        }
    },
    {
        rank: 7,
        model: "GPT-3.5 Turbo",
        organization: "OpenAI",
        overallScore: 79.4,
        proficiencyLevel: "Developing",
        category: "gpt",
        scores: {
            cd1: 82,
            cd2: 80,
            cd3: 78,
            cd4: 75,
            cd5: 81,
            cd6: 80
        }
    },
    {
        rank: 8,
        model: "Claude 3 Haiku",
        organization: "Anthropic",
        overallScore: 77.8,
        proficiencyLevel: "Developing",
        category: "claude",
        scores: {
            cd1: 80,
            cd2: 78,
            cd3: 76,
            cd4: 74,
            cd5: 82,
            cd6: 77
        }
    },
    {
        rank: 9,
        model: "Mistral Large",
        organization: "Mistral AI",
        overallScore: 75.6,
        proficiencyLevel: "Developing",
        category: "other",
        scores: {
            cd1: 78,
            cd2: 76,
            cd3: 74,
            cd4: 72,
            cd5: 77,
            cd6: 77
        }
    },
    {
        rank: 10,
        model: "Llama 2 70B",
        organization: "Meta",
        overallScore: 72.3,
        proficiencyLevel: "Developing",
        category: "other",
        scores: {
            cd1: 75,
            cd2: 73,
            cd3: 71,
            cd4: 69,
            cd5: 74,
            cd6: 72
        }
    },
    {
        rank: 11,
        model: "PaLM 2",
        organization: "Google",
        overallScore: 68.9,
        proficiencyLevel: "Developing",
        category: "other",
        scores: {
            cd1: 72,
            cd2: 70,
            cd3: 68,
            cd4: 65,
            cd5: 71,
            cd6: 68
        }
    },
    {
        rank: 12,
        model: "Vicuna 13B",
        organization: "LMSYS",
        overallScore: 61.4,
        proficiencyLevel: "Emergent",
        category: "other",
        scores: {
            cd1: 65,
            cd2: 63,
            cd3: 60,
            cd4: 57,
            cd5: 64,
            cd6: 59
        }
    }
];

// Language translations
const translations = {
    en: {
        'Input Processing': 'Input Processing',
        'Knowledge Retention': 'Knowledge Retention',
        'Logical Reasoning': 'Logical Reasoning',
        'Creative Cognition': 'Creative Cognition',
        'Human-Centricity': 'Human-Centricity',
        'Output Generation': 'Output Generation'
    },
    zh: {
        'Input Processing': '输入处理',
        'Knowledge Retention': '知识保持',
        'Logical Reasoning': '逻辑推理',
        'Creative Cognition': '创造性认知',
        'Human-Centricity': '以人为中心',
        'Output Generation': '输出生成'
    }
};

let currentLanguage = 'en';
let currentChart = null;
let currentChartType = 'radar';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    populateLeaderboard(modelData);
    initializeChart();
    setupSmoothScrolling();
    setupNavigation();
}

function setupEventListeners() {
    // Language toggle
    document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);
    
    // Filter controls
    document.getElementById('category-filter').addEventListener('change', filterModels);
    document.getElementById('sort-filter').addEventListener('change', sortModels);
    
    // Chart controls
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentChartType = this.dataset.chart;
            updateChart();
        });
    });
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
    document.getElementById('current-lang').textContent = currentLanguage.toUpperCase();
    updateLanguage();
}

function updateLanguage() {
    document.querySelectorAll('[data-en]').forEach(element => {
        const key = currentLanguage === 'en' ? 'data-en' : 'data-zh';
        element.textContent = element.getAttribute(key);
    });
    
    // Update chart if it exists
    if (currentChart) {
        updateChart();
    }
}

function populateLeaderboard(data) {
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = '';
    
    data.forEach(model => {
        const row = createTableRow(model);
        tbody.appendChild(row);
    });
}

function createTableRow(model) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="rank-cell">#${model.rank}</td>
        <td class="model-cell">${model.model}</td>
        <td class="score-cell">${model.overallScore.toFixed(1)}</td>
        <td><span class="proficiency-badge proficiency-${model.proficiencyLevel.toLowerCase()}">${model.proficiencyLevel}</span></td>
        <td><span class="dimension-score">${model.scores.cd1}</span></td>
        <td><span class="dimension-score">${model.scores.cd2}</span></td>
        <td><span class="dimension-score">${model.scores.cd3}</span></td>
        <td><span class="dimension-score">${model.scores.cd4}</span></td>
        <td><span class="dimension-score">${model.scores.cd5}</span></td>
        <td><span class="dimension-score">${model.scores.cd6}</span></td>
        <td>${model.organization}</td>
    `;
    return row;
}

function filterModels() {
    const categoryFilter = document.getElementById('category-filter').value;
    let filteredData = modelData;
    
    if (categoryFilter !== 'all') {
        filteredData = modelData.filter(model => model.category === categoryFilter);
    }
    
    populateLeaderboard(filteredData);
}

function sortModels() {
    const sortBy = document.getElementById('sort-filter').value;
    let sortedData = [...modelData];
    
    if (sortBy === 'overall') {
        sortedData.sort((a, b) => b.overallScore - a.overallScore);
    } else {
        const dimension = sortBy;
        sortedData.sort((a, b) => b.scores[dimension] - a.scores[dimension]);
    }
    
    // Update ranks
    sortedData.forEach((model, index) => {
        model.rank = index + 1;
    });
    
    populateLeaderboard(sortedData);
}

function initializeChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    updateChart();
}

function updateChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    if (currentChart) {
        currentChart.destroy();
    }
    
    const topModels = modelData.slice(0, 6); // Show top 6 models
    
    switch (currentChartType) {
        case 'radar':
            createRadarChart(ctx, topModels);
            break;
        case 'bar':
            createBarChart(ctx, topModels);
            break;
        case 'scatter':
            createScatterChart(ctx, topModels);
            break;
    }
}

function createRadarChart(ctx, models) {
    const dimensions = ['cd1', 'cd2', 'cd3', 'cd4', 'cd5', 'cd6'];
    const dimensionLabels = {
        cd1: currentLanguage === 'en' ? 'Input Processing' : '输入处理',
        cd2: currentLanguage === 'en' ? 'Knowledge Retention' : '知识保持',
        cd3: currentLanguage === 'en' ? 'Logical Reasoning' : '逻辑推理',
        cd4: currentLanguage === 'en' ? 'Creative Cognition' : '创造性认知',
        cd5: currentLanguage === 'en' ? 'Human-Centricity' : '以人为中心',
        cd6: currentLanguage === 'en' ? 'Output Generation' : '输出生成'
    };
    
    const colors = [
        'rgba(79, 70, 229, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)'
    ];
    
    const datasets = models.slice(0, 3).map((model, index) => ({
        label: model.model,
        data: dimensions.map(dim => model.scores[dim]),
        borderColor: colors[index],
        backgroundColor: colors[index].replace('0.8', '0.2'),
        borderWidth: 2,
        pointBackgroundColor: colors[index],
        pointBorderColor: '#fff',
        pointBorderWidth: 2
    }));
    
    currentChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: dimensions.map(dim => dimensionLabels[dim]),
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

function createBarChart(ctx, models) {
    const colors = [
        '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'
    ];
    
    currentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: models.map(model => model.model),
            datasets: [{
                label: currentLanguage === 'en' ? 'Overall Score' : '总体得分',
                data: models.map(model => model.overallScore),
                backgroundColor: colors,
                borderColor: colors.map(color => color + '80'),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function createScatterChart(ctx, models) {
    const datasets = [{
        label: currentLanguage === 'en' ? 'Models' : '模型',
        data: models.map(model => ({
            x: model.scores.cd5, // Human-Centricity
            y: model.overallScore,
            label: model.model
        })),
        backgroundColor: models.map((_, index) => {
            const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
            return colors[index % colors.length];
        }),
        borderColor: '#fff',
        borderWidth: 2,
        pointRadius: 8
    }];
    
    currentChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: currentLanguage === 'en' ? 'Human-Centricity Score' : '以人为中心得分'
                    },
                    min: 60,
                    max: 100
                },
                y: {
                    title: {
                        display: true,
                        text: currentLanguage === 'en' ? 'Overall Score' : '总体得分'
                    },
                    min: 60,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const model = models[context.dataIndex];
                            return `${model.model}: (${context.parsed.x}, ${context.parsed.y})`;
                        }
                    }
                }
            }
        }
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.about-card, .leaderboard-table, .chart-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Export data for potential use
window.hcefData = {
    models: modelData,
    translations: translations
};