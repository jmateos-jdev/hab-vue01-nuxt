<template>
    <div>
        <marquee behavior="alternate" direction="left" scrollamount="10">
            <h1>HEADER</h1>
        </marquee>

        <slot />


        <marquee behavior="alternate" direction="left" scrollamount="10">
            <h1>FOOTER</h1>
        </marquee>
    </div>
</template>