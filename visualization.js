// Visualization page specific JavaScript
class VisualizationManager {
    constructor() {
        this.charts = {};
        this.selectedModels = new Set();
        this.init();
    }

    init() {
        this.setupModelSelector();
        this.initializeCharts();
        this.updateStatistics();
        this.setupLanguageToggle();
    }

    setupModelSelector() {
        const selector = document.getElementById('model-selector');
        if (!selector) return;

        // Select top 6 models by default
        const topModels = modelData.slice(0, 6);
        topModels.forEach(model => this.selectedModels.add(model.name));

        modelData.forEach(model => {
            const checkbox = document.createElement('label');
            checkbox.className = `model-checkbox ${this.selectedModels.has(model.name) ? 'selected' : ''}`;
            checkbox.innerHTML = `
                <input type="checkbox" ${this.selectedModels.has(model.name) ? 'checked' : ''} 
                       onchange="visualizationManager.toggleModel('${model.name}', this.checked)">
                <span>${model.name}</span>
            `;
            selector.appendChild(checkbox);
        });
    }

    toggleModel(modelName, isSelected) {
        const checkbox = event.target.closest('.model-checkbox');
        
        if (isSelected) {
            this.selectedModels.add(modelName);
            checkbox.classList.add('selected');
        } else {
            this.selectedModels.delete(modelName);
            checkbox.classList.remove('selected');
        }
        
        this.updateCharts();
    }

    getSelectedModelData() {
        return modelData.filter(model => this.selectedModels.has(model.name));
    }

    initializeCharts() {
        this.createRadarChart();
        this.createBarChart();
        this.createScatterChart();
        this.createDimensionChart();
        this.createProficiencyChart();
        this.createHeatmapChart();
    }

    updateCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.initializeCharts();
        this.updateStatistics();
    }

    createRadarChart() {
        const ctx = document.getElementById('radarChart');
        if (!ctx) return;

        const selectedData = this.getSelectedModelData();
        const dimensions = ['CD1', 'CD2', 'CD3', 'CD4', 'CD5', 'CD6'];
        
        const datasets = selectedData.map((model, index) => ({
            label: model.name,
            data: dimensions.map(dim => model.scores[dim]),
            borderColor: this.getColor(index),
            backgroundColor: this.getColor(index, 0.2),
            pointBackgroundColor: this.getColor(index),
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: this.getColor(index)
        }));

        this.charts.radar = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: dimensions.map(dim => translations[currentLanguage].dimensions[dim]),
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
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createBarChart() {
        const ctx = document.getElementById('barChart');
        if (!ctx) return;

        const selectedData = this.getSelectedModelData().sort((a, b) => b.overall - a.overall);
        
        this.charts.bar = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: selectedData.map(model => model.name),
                datasets: [{
                    label: translations[currentLanguage].overall,
                    data: selectedData.map(model => model.overall),
                    backgroundColor: selectedData.map((_, index) => this.getColor(index, 0.8)),
                    borderColor: selectedData.map((_, index) => this.getColor(index)),
                    borderWidth: 2
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

    createScatterChart() {
        const ctx = document.getElementById('scatterChart');
        if (!ctx) return;

        const selectedData = this.getSelectedModelData();
        
        this.charts.scatter = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Models',
                    data: selectedData.map(model => ({
                        x: model.scores.CD5, // Human-Centricity
                        y: model.overall,
                        label: model.name
                    })),
                    backgroundColor: selectedData.map((_, index) => this.getColor(index, 0.7)),
                    borderColor: selectedData.map((_, index) => this.getColor(index)),
                    pointRadius: 8,
                    pointHoverRadius: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: translations[currentLanguage].dimensions.CD5
                        },
                        min: 0,
                        max: 100
                    },
                    y: {
                        title: {
                            display: true,
                            text: translations[currentLanguage].overall
                        },
                        min: 0,
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
                                return `${context.raw.label}: (${context.raw.x.toFixed(1)}, ${context.raw.y.toFixed(1)})`;
                            }
                        }
                    }
                }
            }
        });
    }

    createDimensionChart() {
        const ctx = document.getElementById('dimensionChart');
        if (!ctx) return;

        const dimensions = ['CD1', 'CD2', 'CD3', 'CD4', 'CD5', 'CD6'];
        const selectedData = this.getSelectedModelData();
        
        // Calculate average scores for each dimension
        const avgScores = dimensions.map(dim => {
            const scores = selectedData.map(model => model.scores[dim]);
            return scores.reduce((sum, score) => sum + score, 0) / scores.length;
        });

        this.charts.dimension = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: dimensions.map(dim => translations[currentLanguage].dimensions[dim]),
                datasets: [{
                    data: avgScores,
                    backgroundColor: dimensions.map((_, index) => this.getColor(index, 0.6)),
                    borderColor: dimensions.map((_, index) => this.getColor(index)),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createProficiencyChart() {
        const ctx = document.getElementById('proficiencyChart');
        if (!ctx) return;

        const selectedData = this.getSelectedModelData();
        const proficiencyLevels = ['Emergent', 'Developing', 'Proficient', 'Expert'];
        
        // Count models in each proficiency level
        const counts = proficiencyLevels.map(level => {
            return selectedData.filter(model => model.proficiency === level).length;
        });

        this.charts.proficiency = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: proficiencyLevels.map(level => translations[currentLanguage].proficiency[level]),
                datasets: [{
                    data: counts,
                    backgroundColor: [
                        '#ef4444', // Red for Emergent
                        '#f59e0b', // Orange for Developing
                        '#10b981', // Green for Proficient
                        '#3b82f6'  // Blue for Expert
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createHeatmapChart() {
        const ctx = document.getElementById('heatmapChart');
        if (!ctx) return;

        const selectedData = this.getSelectedModelData();
        const dimensions = ['CD1', 'CD2', 'CD3', 'CD4', 'CD5', 'CD6'];
        
        // Create matrix data for heatmap
        const matrixData = [];
        selectedData.forEach((model, modelIndex) => {
            dimensions.forEach((dim, dimIndex) => {
                matrixData.push({
                    x: dimIndex,
                    y: modelIndex,
                    v: model.scores[dim]
                });
            });
        });

        this.charts.heatmap = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Performance',
                    data: matrixData,
                    backgroundColor: function(context) {
                        const value = context.parsed.v;
                        const alpha = value / 100;
                        return `rgba(79, 70, 229, ${alpha})`;
                    },
                    pointRadius: function(context) {
                        return Math.max(5, (context.parsed.v / 100) * 20);
                    }
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        min: -0.5,
                        max: dimensions.length - 0.5,
                        ticks: {
                            stepSize: 1,
                            callback: function(value) {
                                return dimensions[value] ? translations[currentLanguage].dimensions[dimensions[value]] : '';
                            }
                        }
                    },
                    y: {
                        type: 'linear',
                        min: -0.5,
                        max: selectedData.length - 0.5,
                        ticks: {
                            stepSize: 1,
                            callback: function(value) {
                                return selectedData[value] ? selectedData[value].name : '';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            title: function() {
                                return '';
                            },
                            label: function(context) {
                                const model = selectedData[context.parsed.y];
                                const dimension = dimensions[context.parsed.x];
                                return `${model.name} - ${translations[currentLanguage].dimensions[dimension]}: ${context.parsed.v.toFixed(1)}`;
                            }
                        }
                    }
                }
            }
        });
    }

    updateStatistics() {
        const selectedData = this.getSelectedModelData();
        if (selectedData.length === 0) return;

        const scores = selectedData.map(model => model.overall);
        const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        const topScore = Math.max(...scores);
        const expertCount = selectedData.filter(model => model.proficiency === 'Expert').length;
        
        document.getElementById('avg-score').textContent = avgScore.toFixed(1);
        document.getElementById('top-score').textContent = topScore.toFixed(1);
        document.getElementById('expert-count').textContent = expertCount;
        document.getElementById('total-models').textContent = selectedData.length;
    }

    getColor(index, alpha = 1) {
        const colors = [
            `rgba(79, 70, 229, ${alpha})`,   // Indigo
            `rgba(16, 185, 129, ${alpha})`,  // Emerald
            `rgba(245, 158, 11, ${alpha})`,  // Amber
            `rgba(239, 68, 68, ${alpha})`,   // Red
            `rgba(139, 92, 246, ${alpha})`,  // Violet
            `rgba(6, 182, 212, ${alpha})`,   // Cyan
            `rgba(236, 72, 153, ${alpha})`,  // Pink
            `rgba(34, 197, 94, ${alpha})`,   // Green
            `rgba(251, 146, 60, ${alpha})`,  // Orange
            `rgba(168, 85, 247, ${alpha})`,  // Purple
            `rgba(14, 165, 233, ${alpha})`,  // Sky
            `rgba(132, 204, 22, ${alpha})`   // Lime
        ];
        return colors[index % colors.length];
    }

    setupLanguageToggle() {
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
                this.updateLanguage();
                this.updateCharts(); // Recreate charts with new language
            });
        }
    }

    updateLanguage() {
        document.getElementById('current-lang').textContent = currentLanguage.toUpperCase();
        
        // Update all translatable elements
        document.querySelectorAll('[data-en]').forEach(element => {
            const key = currentLanguage === 'en' ? 'data-en' : 'data-zh';
            element.textContent = element.getAttribute(key);
        });
    }
}

// Initialize visualization manager when page loads
let visualizationManager;

document.addEventListener('DOMContentLoaded', function() {
    visualizationManager = new VisualizationManager();
});

// Handle window resize
window.addEventListener('resize', function() {
    if (visualizationManager) {
        Object.values(visualizationManager.charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize();
            }
        });
    }
});

// Export for global access
window.visualizationManager = visualizationManager;