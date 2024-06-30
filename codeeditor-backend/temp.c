#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char code[] = "printf(\"Hello, World!\\n\");"; // Example C code
    FILE *fp;
    
    fp = fopen("temp.c", "w");
    if (fp == NULL) {
        perror("Error writing C code to file");
        return 1;
    }
    fputs(code, fp);
    fclose(fp);

    int ret = system("gcc temp.c -o temp.out && ./temp.out");
    if (ret != 0) {
        fprintf(stderr, "Error executing C code\n");
        return 1;
    }

    return 0;
}
