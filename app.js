const { createApp } = Vue;

createApp({
  data() {
    return {
      novaDisciplina: '',
      novaCarga: '',
      estudos: [],
      erro: false,
      filtro: 'todos'
    };
  },
  computed: {
    estudosFiltrados() {
      if (this.filtro === 'pendentes') {
        return this.estudos.filter(e => !e.concluido);
      } else if (this.filtro === 'concluidos') {
        return this.estudos.filter(e => e.concluido);
      }
      return this.estudos;
    }
  },
  methods: {
    adicionarEstudo() {
      this.erro = false;
      if (!this.novaDisciplina.trim() || !this.novaCarga.trim()) {
        this.erro = true;
        return;
      }
      this.estudos.push({
        nome: this.novaDisciplina,
        carga: this.novaCarga,
        concluido: false
      });
      this.novaDisciplina = '';
      this.novaCarga = '';
    },
    remover(index) {
      this.estudos.splice(index, 1);
    }
  },
  mounted() {
    const dadosSalvos = localStorage.getItem('estudosVue');
    if (dadosSalvos) {
      this.estudos = JSON.parse(dadosSalvos);
    }
  },
  watch: {
    estudos: {
      handler(novosEstudos) {
        localStorage.setItem('estudosVue', JSON.stringify(novosEstudos));
      },
      deep: true
    }
  }
}).mount('#app');
