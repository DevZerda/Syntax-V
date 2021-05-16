/*
*
*
*
*       Syntax NET setup file
*
*
*/

#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    system("yum install -y gcc-c++ make -y -q");
    system("curl -sL https://rpm.nodesource.com/setup_15.x | sudo -E bash -");
    system("yum install nodejs -y -q");
    system("npm install node-fetch");
    system("npm install ssh-exec");
    system("npm install moment");
    system("npm install timezone-moment");
}