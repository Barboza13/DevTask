<script setup lang="ts"></script>

<template>
    <nav class="nav">
        <div class="nav-title-container">
            <h1 class="nav-title">DevTask</h1>
        </div>
        <ul class="nav-list">
            <li class="nav-list-item">
                <router-link class="link" to="/">Home</router-link>
            </li>
            <li class="nav-list-item">
                <router-link class="link" to="/projects">
                    Projects
                </router-link>
            </li>
            <li class="nav-list-item">
                <router-link class="link" to="/tasks">Tasks</router-link>
            </li>
            <li class="nav-list-item">
                <router-link class="link" to="/members">Members</router-link>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
    .nav {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: #333;
        padding: 1rem;

        .nav-title-container {
            .nav-title {
                color: white;
            }
        }

        .nav-list {
            display: flex;
            list-style: none;
            gap: 3rem;

            .nav-list-item {
                .link {
                    color: white;
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>
