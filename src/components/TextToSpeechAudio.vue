<template>
    <div class="audio-container">
        <audio :src="src" type="audio/mpeg" controls ref="audio">
        </audio>
        <button class="custom-btn btn btn-success" @click="loadAudio">Tải âm thanh</button>
        <select class="form-select custom-select" v-model="isFemaleVoice">
            <option value="false">Nam</option>
            <option value="true">Nữ</option>
        </select>
        <select class="form-select custom-select" v-model="audioSpeed" @change="setAudioSpeed">
            <option value="1">1</option>
            <option value="1.25">1.25</option>
            <option value="1.5">1.5</option>
            <option value="1.75">1.75</option>
            <option value="2">2</option>
        </select>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "TextToSpeechAudio",
    data() {
        return {
            chapterId: 1,//this.$store.state.chapterId,
            src: "",
            isFemaleVoice: true,
            audioSpeed: 1
        }
    },
    beforeMount() {
        this.loadAudio();
    },

    methods: {
        loadAudio() {
            this.src = "http://localhost:8000/audio?chapterId=" + this.chapterId + "&female=" + this.isFemaleVoice;
        },
        setAudioSpeed() {
            this.$refs.audio.playbackRate  = this.audioSpeed;
        }
    }
    
}
</script>

<style scoped>
.audio-container {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 3rem;
    align-items: center;
}

.custom-btn {
    height: 3rem;
}

.custom-select {
    margin-left: 2rem;
    width: 7rem;
    height: 3rem;
}
</style>