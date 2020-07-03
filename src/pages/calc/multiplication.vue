<template>
    <div class="page-content">
        <div class="align-center-layout">

            <h2>Welcome to Social Multiplication</h2>
            <h4>This is your challenge for today</h4>

            <div class="align-end-layout">
                <p style="font-size: 24px; font-weight: bold;">{{factorA}}×{{factorB}}</p>
                <div
                    type="button" 
                    name="Refresh"
                    class="button" 
                    @click="refreshFactors">
                    换一题
                </div>
            </div>
            <div>
                <span>Result：</span>
                <input 
                    class="input-text" 
                    type="text" 
                    v-model="resultAttempt"
                    placeholder="输入计算结果" 
                    />
            </div>
            <div style="margin-top: 10px;">
                <span>Your Alias：</span>
                <input 
                    class="input-text" 
                    type="text" 
                    v-model="alias"
                    placeholder="您的昵称" 
                    />
            </div>
            <span 
                class="result-text" 
                :style="resutTextStype" 
                v-show="checked">
                {{resultText}}
            </span>
            
            <div class="button" @click="submit">计算</div>
            
        </div>
    </div>
</template>

<script>
    
    import {
        getRandomFactors, postResult
    } from '#/multiplication.js'

    export default {
        data(){
            return {
                factorA: 0,
                factorB: 0,
                resultAttempt: null,
                alias: null,
                checked: false,
                correctResult: null,
                correct: false
            }
        },

        computed: {
            resutTextStype: function(){
                return {
                    color: this.correct ? 'green' : 'red'
                }
            },

            resultText: function(){
                return this.correct ? `恭喜您答对了！` : `正确答案是：${this.correctResult}`
            }

        },

        mounted(){
            this.loadMultiplicationFactors()
        },

        methods: {
            loadMultiplicationFactors(){
                getRandomFactors()
                    .then(resp => {
                        let multiFormula = resp.data
                        this.factorA = multiFormula.factorA
                        this.factorB = multiFormula.factorB
                    })
                    .catch(err => {

                    })
            },

            refreshFactors(){
                this.checked = false
                this.resultAttempt = null
                this.loadMultiplicationFactors()
            },

            submit(){
                let resultAttempt = {
                    user: {
                        alias: this.alias
                    },
                    multiplication: {
                        factorA: this.factorA,
                        factorB: this.factorB,
                    },
                    resultAttempt: this.resultAttempt
                }
                postResult(resultAttempt)
                    .then(resp => {
                        this.correctResult = resp.data.multiplication.result
                        this.checked = true
                        this.correct = resp.data.correct
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    };
</script>

<style scoped>
    
    .page-content {
        width: 50%;
        height: calc(100% - 16px);
        margin: 8px auto;
        background: #eee;
    }

    .align-center-layout {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
    }

    .align-end-layout {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
    }

    .input-text {
        margin: 0px 8px;
        border: 2px solid #ccc;
        padding: 5px 8px;
        border-radius: 3px;
        font-size: 16px;
    }

    .input-text:focus {
        border: 2px solid #0C76CE;
    }

    .result-text {
        margin-top: 5px;
        font-size: 14px;
    }

    .button {
        width: 80px;
        height: 36px;
        line-height: 36px;
        margin: 16px;
        color: #0C76CE;
        border: 1px solid #0C76CE;
        border-radius: 5px
    }

    .button:hover {
        color: #fff;
        background: #0C76CE;
        cursor: pointer;
    }
</style> 