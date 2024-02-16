import momin from "../../assets/momin.jpeg";
import mahbub from "../../assets/mahbub.jpg";
import review from "../../assets/review.png";
import React from "react";

const Review = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-center">Some Books Review</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 my-10 gap-4">
        <div
          data-aos="zoom-in"
          className="border bg-yellow-50 py-7 rounded-md space-y-2 text-center"
        >
          <img
            src={momin}
            className="w-12 mx-auto rounded-3xl border border-green-500"
            alt=""
          />
          <h1 className="text-xl font-semibold text-green-400">
            Programming with C++
          </h1>
          <p className="px-5">
            A Comprehensive Guide by John Smith is a must-have for both
            beginners and experienced programmers alike. Smith thorough approach
            to explaining complex concepts in a clear and accessible manner
            makes this book an invaluable resource for anyone looking to deepen
            their understanding of C++. From basic syntax to advanced topics
            like templates and multithreading, Smith covers it all with
            precision and depth. His real-world examples and practical exercises
            not only reinforce learning but also provide invaluable insights
            into best practices and common pitfalls.
          </p>
          <img src={review} className="mx-auto" alt="" />
        </div>
        <div
          data-aos="zoom-in"
          className="border bg-yellow-50 pt-6 pb-3 rounded-md space-y-2 text-center"
        >
          <img
            src={mahbub}
            className="w-12 mx-auto rounded-3xl border border-green-500"
            alt=""
          />
          <h1 className="text-xl font-semibold text-green-400">
            OPERATING SYSTEM
          </h1>
          <p className="px-5">
            Operating Systems: Principles and Practice by Thomas Anderson and
            Michael Dahlin is a definitive guide that offers a comprehensive
            overview of the principles and inner workings of modern operating
            systems. The authors present complex concepts in a clear and
            accessible manner, making it suitable for both beginners and
            experienced professionals in the field. From the fundamentals of
            process management and memory allocation to more advanced topics
            like file systems and virtualization, the book covers all aspects of
            operating system design and implementation.
          </p>
          <img src={review} className="mx-auto" alt="" />
        </div>
        <div
          data-aos="zoom-in"
          className="border bg-yellow-50 py-7 rounded-md space-y-2 text-center"
        >
          <img
            src={mahbub}
            className="w-12 mx-auto rounded-3xl border border-green-500"
            alt=""
          />
          <h1 className="text-xl font-semibold text-green-400">
            Data Structure
          </h1>
          <p className="px-5">
            Data Structures and Algorithms in Python by Michael T. Goodrich,
            Roberto Tamassia, and Michael H. Goldwasser is an exceptional
            resource for mastering data structures and algorithms using the
            Python programming language. This comprehensive book covers a wide
            range of topics, including arrays, linked lists, stacks, queues,
            trees, graphs, sorting algorithms, searching algorithms, and more.
            The authors provide clear explanations of each data structure and
            algorithm, accompanied by Python code examples and illustrations to
            aid comprehension.
          </p>
          <img src={review} className="mx-auto" alt="" />
        </div>
        <div
          data-aos="zoom-in"
          className="border bg-yellow-50 py-7 rounded-md space-y-2 text-center"
        >
          <img
            src={momin}
            className="w-12 mx-auto rounded-3xl border border-green-500"
            alt=""
          />
          <h1 className="text-xl font-semibold text-green-400">
            Discrete Mathematics
          </h1>
          <p className="px-5">
            Discrete Mathematics and Its Applications by Kenneth H. Rosen is an
            essential textbook for anyone studying discrete mathematics. This
            comprehensive guide covers a wide range of topics including logic,
            set theory, relations, functions, graph theory, combinatorics, and
            more. Rosen clear and concise explanations make complex concepts
            accessible to students at all levels. Each chapter is carefully
            structured with numerous examples, exercises, and problems to
            reinforce learning and facilitate understanding.
          </p>
          <img src={review} className="mx-auto" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Review;
