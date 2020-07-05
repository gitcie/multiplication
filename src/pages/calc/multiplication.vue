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

            <el-table
                style="width: 100%;"
                :data="recentAttempts">
                <el-table-column
                    prop="id"
                    label="AttemptId"
                />
                <el-table-column
                    prop="multiFactors"
                    label="因子"
                />
                <el-table-column
                    prop="enterResult"
                    label="输入结果"
                />
                <el-table-column
                    prop="correct"
                    label="是否正确"
                />
                
            </el-table>
            
        </div>
    </div>
</template>

<script>
    
    import {
        getRandomFactors, postResult, getUserRecentAttempts
    } from '#/multiplication.js'

    import Vue from 'vue'
    import { Table, TableColumn} from 'element-ui'
    Vue.use(Table).use(TableColumn)

    export default {
        data(){
            return {
                factorA: 0,
                factorB: 0,
                resultAttempt: null,
                alias: 'lusiyi',
                checked: false,
                correctResult: null,
                correct: false,
                recentAttempts: null
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
            this.updateRecentAttempts(this.alias)
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
                        this.updateRecentAttempts(this.alias)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },

            updateRecentAttempts(alias){
                getUserRecentAttempts(alias)
                    .then(resp => {
                        console.log(`最近尝试：${JSON.stringify(resp.data, null, 4)}`)
                        this.recentAttempts = resp.data.map(item =>{
                            return {
                                id: item.id,
                                multiFactors: `${item.multiplication.factorA}×${item.multiplication.factorB}`,
                                enterResult: item.resultAttempt,
                                correct: item.correct ? "正确" : "错误"
                            }
                        })
                        console.log(`重构数据：${JSON.stringify(this.recentAttempts, null, 4)}`)
                    })
                    .catch(err => {

                    })
            }
        }
    };
</script>

<style scoped>
    
    .page-content {
        width: 62%;
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